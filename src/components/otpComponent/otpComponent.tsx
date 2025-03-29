import CloseIcon from '@mui/icons-material/Close'; // Import the close icon
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import React, { FC, useState } from 'react';
import Countdown, { CountdownRenderProps, zeroPad } from 'react-countdown';
import OtpInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';
import { useData } from '../../hooks/DataContext';
import {
  getCart,
  loginViaEmail,
  loginViaMobile,
  userlogin,
  verifyEmail,
  verifyMobile,
} from '../../services/auth-handler.service';

interface otpComponentProps {
  open: boolean;
  handleClose: () => void;
  onConfirm: (mobileNumber: string) => void;
}

const otpComponent: FC<otpComponentProps> = ({
  open,
  handleClose,
  onConfirm,
}) => {
  const [otp, setOtp] = useState<string>('');
  const [disableInput, setDisableInput] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [timer, setTimer] = useState<number>(Date.now() + 60000);
  const [disableResendLink, setDisableResendLink] = useState<boolean>(true);
  const navigate = useNavigate();
  const { data } = useData();
  const { login } = useAuth();
  let countdownApi: any;
  const [disableBtn, setDisableBtn] = useState(true);
  // Use useRef to get a reference to the Countdown component
  // const countdownRef = useRef<Countdown>(null);

  const countdownRef = (countdown: any) => {
    if (countdown) {
      countdownApi = countdown.getApi();
    }
  };

  const submitOtp = (otp: string) => {
    console.log(data);
    if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      setErrorMessage('Please enter a valid 6-digit OTP.');
      return;
    }
    setErrorMessage(null);
    setDisableInput(true);
    const isEmailLogin = data.login.loginVia === 'email';
    verifyOtp(otp, isEmailLogin ? verifyEmail : verifyMobile);
  };

  const verifyOtp = (otp: any, verifyCb: any) => {
    setIsLoading(true);
    countdownApi.pause();
    verifyCb(data.login.userLoginId, otp)
      .then(async (response: any) => {
        login();
        const objUserData = await userlogin({
          mobile: '+91-' + data.login.userLoginId,
        });
        if (objUserData?.data?.user?.id > 0) {
          setDisableBtn(true);
          const cartResponse = await getCart({
            mobile: objUserData?.data?.user?.mobile,
          });
          if (
            cartResponse.statusText === 'OK' &&
            cartResponse.data.cartitems.length > 0
          ) {
            sessionStorage.setItem(
              'cartItemCount',
              JSON.stringify(cartResponse.data.cartitems.product)
            );
          }
          handleClose(); // Close the dialog
          navigate('/', { replace: true });
        } else {
          setDisableBtn(false);
        }
        setIsLoading(false);
      })
      .catch((error: any) => {
        setErrorMessage('Invalid OTP. Please try again.');
        setDisableInput(false);
        countdownApi.start();
        console.error(error);
        setIsLoading(false);
      });
  };

  const handleConfirm = () => {
    onConfirm('otp verify'); // Pass the mobile number to the parent
    handleClose(); // Close the dialog
    //handleOtpClose();
  };

  const countDownRenderer = ({ minutes, seconds }: CountdownRenderProps) => {
    return (
      <div className="text-center timer">
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

  const otpBoxStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '40px', // Ensures it scales down on smaller screens
    height: '40px',
    borderRadius: '4px',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    fontSize: '16px',
    textAlign: 'center',
  };

  const otpContainer: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    gap: '5px', // Keeps spacing consistent
    margin: '20px auto',
  };

  const handleSuccess = () => {
    setOtp('');
    setDisableInput(false);
    handleClose();
  };

  return (
    <otpComponentWrapper data-testid="otpComponent">
      <div className="flex justify-center items-center">
        <Dialog
          open={open}
          onClose={(event, reason) => {
            if (reason !== 'backdropClick') {
              handleClose();
            }
          }}
          fullWidth
          maxWidth="xs"
          sx={{
            '& .MuiPaper-root': {
              borderRadius: '2px',
              margin: '0',
              position: 'absolute',
              bottom: { xs: 0, sm: 'auto' },
              transform: { xs: 'translateY(0)', sm: 'translateY(-50%)' },
              top: { sm: '50%' },
              left: { sm: '50%' },
              transformOrigin: 'center',
              width: '100%',
            },
          }}
        >
          <DialogTitle>
            <Typography variant="h6" align="center">
              {/* Dialog Title */}
            </Typography>
            {/* Close Icon */}
            <IconButton
              aria-label="close"
              onClick={handleClose}
              style={{
                position: 'absolute',
                right: 8,
                top: 8,
                display: 'none',
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <div className="pb-2">
              <h3 className="text-sm leading-8 text-left text-black font-medium">
                Enter OTP
              </h3>
              <div className="text-xs font-light">
                6 digit OTP has been sent to your number
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <div className="flex">
                <div className="text-xs font-medium">
                  {data?.login?.userLoginId}
                </div>
                <div className="text-xs font-light pl-2">
                  Not Yours?
                  <button className="text-xs font-normal text-red-500 hover:underline">
                    Change
                  </button>
                </div>
              </div>
            </div>
            <OtpInput
              numInputs={6}
              inputType="text"
              renderInput={(props) => (
                <input
                  {...props}
                  aria-invalid={otp.length !== 6 || !/^\d{6}$/.test(otp)}
                  style={{
                    ...otpBoxStyle,
                    border:
                      otp.length === 6 && /^\d{6}$/.test(otp)
                        ? '1px solid #ccc'
                        : '1px solid red',
                  }}
                />
              )}
              value={otp}
              onChange={(value: string) => {
                setOtp(value);
                submitOtp(value);
                if (value.length === 6 && /^\d{6}$/.test(value)) {
                  setDisableBtn(false);
                } else {
                  setDisableBtn(true);
                }
              }}
              containerStyle={otpContainer}
            />
            {otp.length !== 6 || !/^\d{6}$/.test(otp) ? (
              <div className="text-xs text-red-500 text-center mt-1">
                Please enter a valid 6-digit OTP.
              </div>
            ) : null}
            {errorMessage && (
              <div className="text-xs text-red-500 text-center mt-2">
                {errorMessage}
              </div>
            )}

            <div className="flex items-center mb-3 ">
              <div className="text-xs font-light">Didn't receive a OTP? </div>
              <div className="text-gray-subtext text-sm pl-2">
                <span>Resend OTP in </span>
              </div>
              <div className="text-gray-subtext text-sm pl-2">
                <Countdown
                  date={timer}
                  key={timer}
                  ref={countdownRef}
                  renderer={countDownRenderer}
                  onComplete={onTimerComplete}
                />
              </div>
            </div>
            <div className="flex items-center mb-3 ">
              <p className="text-xs font-light">
                Didn't get it?{' '}
                <button
                  className="btn btn-link p-0 text-decoration-none cnc-text-col-rose"
                  disabled={disableResendLink}
                  onClick={resendOtp}
                >
                  Resend OTP
                </button>
              </p>
            </div>
          </DialogContent>
          <DialogActions
            style={{
              paddingBottom: '25px',
              paddingLeft: '4px',
              paddingRight: '4px',
            }}
          >
            <button
              className={`p-2 h-11 w-full text-sm flex justify-center items-center rounded-xl ${
                disableBtn
                  ? 'bg-gray-400 text-white'
                  : 'bg-menuHilight text-black'
              }`}
              onClick={handleConfirm}
              disabled={disableBtn}
            >
              Continue
            </button>
          </DialogActions>
        </Dialog>
      </div>
    </otpComponentWrapper>
  );
};

export default otpComponent;
