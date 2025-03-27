import React, { FC, useState, useRef } from 'react';
import { OtpVerificationWrapper } from './OtpVerification.styled';
import { useNavigate } from 'react-router-dom';
import OtpInput from 'react-otp-input';
import Countdown, { zeroPad, CountdownRenderProps } from 'react-countdown';
import { useAuth } from '../../hooks/AuthContext';
import { useData } from '../../hooks/DataContext';
import { loginViaEmail, verifyEmail, loginViaMobile, verifyMobile } from '../../services/auth-handler.service';
import './OtpVerification.css';

// Define the type for the verify function callback
type VerifyOtpFunction = (userLoginId: string, otp: string) => Promise<any>;

const OtpVerification: FC = () => {
  const { data } = useData();
  const { login } = useAuth();
  const [otp, setOtp] = useState<string>('');
  const [disableInput, setDisableInput] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(Date.now() + 60000);
  const [disableResendLink, setDisableResendLink] = useState<boolean>(true);
  const navigate = useNavigate();

  // Use useRef to get a reference to the Countdown component
  const countdownRef = useRef<Countdown>(null);

  const submitOtp = (otp: string) => {
    if (otp.length === 6) {
      setDisableInput(true);
      const isEmailLogin = data.login.loginVia === 'email';
      verifyOtp(otp, isEmailLogin ? verifyEmail : verifyMobile);
    }
  };

  const verifyOtp = (otp: string, verifyCb: VerifyOtpFunction) => {
    // Get the countdown API from the ref
    const countdownApi = countdownRef.current?.getApi();
    if (countdownApi) {
      countdownApi.pause();
    }
    verifyCb(data.login.userLoginId, otp)
      .then(() => {
        login();
        navigate('/', { replace: true });
      })
      .catch((error) => {
        setDisableInput(false);
        if (countdownApi) {
          countdownApi.start();
        }
        console.error(error);
      });
  };

  const countDownRenderer = ({ minutes, seconds }: CountdownRenderProps) => {
    return (
      <div className='text-center mb-4 timer'>
        {zeroPad(minutes)}:{zeroPad(seconds)}
      </div>
    );
  };

  const onTimerComplete = () => {
    setDisableResendLink(false);
  };

  const resendOtp = () => {
    setDisableResendLink(true);
    setTimer(Date.now() + 60000);
    const isEmailLogin = data.login.loginVia === 'email';
    if (isEmailLogin) {
      loginViaEmail(data.login.userLoginId);
    } else {
      loginViaMobile(data.login.userLoginId);
    }
  };

  return (
    <OtpVerificationWrapper data-testid="OtpVerification">
      <div className='p-4 verification-container'>
        <h2>Enter OTP</h2>
        <p className="otp-sent mt-4 mb-4">
          Please enter the OTP sent to <br />
          {data.login.userLoginId}
        </p>
        <OtpInput
          numInputs={6}
          inputType="text"
          renderInput={(props) => <input disabled={disableInput} {...props} />}
          value={otp}
          onChange={(value: string) => {
            setOtp(value);
            submitOtp(value);
          }}
          containerStyle="otp-container mb-4"
          inputStyle="otp-box"
        />
        <Countdown
          date={timer}
          key={timer}
          ref={countdownRef}
          renderer={countDownRenderer}
          onComplete={onTimerComplete}
        />
        <p className='text-center'>
          Didn't get it?{' '}
          <button
            className='btn btn-link p-0 text-decoration-none cnc-text-col-rose'
            disabled={disableResendLink}
            onClick={resendOtp}
          >
            Resend OTP
          </button>
        </p>
      </div>
    </OtpVerificationWrapper>
  );
};

export default OtpVerification;
