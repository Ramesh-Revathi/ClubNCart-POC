import React, { FC, useRef, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Import the close icon
import OtpInput from 'react-otp-input';
import { otpComponentWrapper } from './otpComponent.styled';
import Countdown, { CountdownRenderProps, zeroPad } from "react-countdown";
import { loginViaEmail, verifyEmail, loginViaMobile, verifyMobile, userlogin, getCart } from '../../services/auth-handler.service';
import { useNavigate } from "react-router-dom";
import { useData } from "../../hooks/DataContext";
import { useAuth } from "../../hooks/AuthContext";
import { motion } from "framer-motion";

interface otpComponentProps {
  open: boolean;
  handleClose: () => void;
  onConfirm: (mobileNumber: string) => void;
}

const otpComponent: FC<otpComponentProps> = (
  { open,
    handleClose,
    onConfirm, }) => {
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
      setErrorMessage("Please enter a valid 6-digit OTP.");
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
        const objUserData = await userlogin({ "mobile": ('+91-' + data.login.userLoginId) });
        if (objUserData?.data?.user?.id > 0) {
          setDisableBtn(true);
          const cartResponse = await getCart({ "mobile": objUserData?.data?.user?.mobile });
          if (cartResponse.statusText === "OK" && cartResponse.data.cartitems.length > 0) {
            sessionStorage.setItem("cartItemCount", JSON.stringify(cartResponse.data.cartitems.product));
          }
          handleClose(); // Close the dialog
          navigate('/', { replace: true });

        } else {
          setDisableBtn(false);
        }
        setIsLoading(false);
      })
      .catch((error: any) => {
        setErrorMessage("Invalid OTP. Please try again.");
        setDisableInput(false);
        countdownApi.start();
        console.error(error);
        setIsLoading(false);
      });
  };


  const handleConfirm = () => {
    onConfirm("otp verify"); // Pass the mobile number to the parent
    handleClose(); // Close the dialog
    //handleOtpClose();
  };

  const countDownRenderer = ({ minutes, seconds }: CountdownRenderProps) => {
    return (
      <div className='text-center timer'>
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
    width: "30px",
    height: "40px",
    margin: "5px",
    fontSize: "22px",
    textAlign: "center",
    borderRadius: "12px",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    background: "rgba(255, 255, 255, 0.15)",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
    backdropFilter: "blur(8px)",
    color: "white"
  };
  const otpContainer: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    gap: "5px", // Keeps spacing consistent
    margin: "20px auto",
  };

  const handleSuccess = () => {
    setOtp("");
    setDisableInput(false);
    handleClose();
  };

  return (
    <otpComponentWrapper data-testid="otpComponent">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed  w-screen h-screen flex items-center justify-center z-50 p-4"
      >
        <Dialog
          open={open}
          onClose={(event, reason) => {
            if (reason !== "backdropClick") {
              handleClose();
            }
          }}
          fullWidth
          maxWidth="xs"
          sx={{
            "& .MuiPaper-root": {
              backdropFilter: "blur(20px)",
              background: "rgba(255, 255, 255, 0.1)",
              boxShadow: "0px 20px 60px rgba(0, 0, 0, 0.5)",
              borderRadius: "20px",
              padding: "24px",
              width: "100%",
              maxWidth: "360px",
              position: "relative",
            },
          }}
        >
          <DialogTitle>
            <Typography variant="h6" align="center" sx={{ color: "white", fontWeight: "bold" }}>
              Enter OTP
            </Typography>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              style={{ position: "absolute", right: 8, top: 8, color: "white" }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <div className="flex justify-center">
              <OtpInput
                numInputs={6}
                inputType="text"
                renderInput={(props) => <input {...props} style={otpBoxStyle} />}
                value={otp}
                onChange={(value) => {
                  setOtp(value);
                  submitOtp(value);
                  setDisableBtn(value.length !== 6 || !/^[0-9]{6}$/.test(value));
                }}
              />
            </div>
            <div className="flex items-center justify-center mt-3 text-xs text-white gap-1 whitespace-nowrap">
              <span>Didn't receive OTP? Resend in</span>
              <Countdown date={timer} key={timer} ref={countdownRef} renderer={countDownRenderer}
                onComplete={onTimerComplete} />
            </div>
            <div className="flex justify-center items-center mt-3 text-xs text-white gap-2">
              <span>Didn't get it?</span>
              <button
                className="text-orange-400 font-medium hover:underline hover:text-orange-300 transition-all duration-200 disabled:text-white-500"
                disabled={disableResendLink}
                onClick={resendOtp}
              >
                Resend OTP
              </button>
            </div>
          </DialogContent>
          <DialogActions className="flex justify-center pb-5">
            <button
              className={`p-3 h-12 w-full max-w-xs text-sm flex justify-center items-center rounded-2xl transition-all duration-300 font-semibold ${disableBtn ? "bg-gray-500 text-white cursor-not-allowed" : "bg-menuHilight text-black hover:shadow-xl hover:scale-105"
                }`}
              onClick={handleConfirm}
              disabled={disableBtn}
            >
              Continue
            </button>
          </DialogActions>
        </Dialog>
      </motion.div>
    </otpComponentWrapper>
  )
};

export default otpComponent;
