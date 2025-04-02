import React, { FC, useEffect, useState } from "react";
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
import { registerMobileNoPopupWrapper } from "./registerMobileNoPopup.styled";
import OtpComponentStories from "../otpComponent/otpComponent.stories";
import OtpComponent from "../otpComponent/otpComponent";
import MdAddressDetailsPopup from "../MdAddressDetailsPopup/MdAddressDetailsPopup";
import AddressMapComponent from "../addressMapComponent/addressMapComponent";
import { motion } from "framer-motion";

interface RegisterMobileNoPopupProps {
  open: boolean;
  otpOpen: boolean;
  addressOpen:boolean;
  handleClose: () => void;
  handleOtpClose:() => void; 
  handleAddressClose:() => void;
  onSaveAddress:(address: {
    fullName: string;
    addressLine1: string;
    addressLine2: string;
    addressType: string;
  }) => void;
  onConfirm: (mobileNumber: string) => void; // Callback to pass the value to the parent
  onOtpConfirm:(mobileNumber: string) => void; // Callback to pass the value to the parent
}

const RegisterMobileNoPopup: FC<RegisterMobileNoPopupProps> = ({
  open,
  otpOpen,
  addressOpen,
  handleClose,
  handleOtpClose,
  handleAddressClose,
  onSaveAddress,
  onConfirm,
  onOtpConfirm,
}) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedAdress, setSelectedAdress] = useState<any>(null);
    const [isPopupAddressOpen, setIsPopupAddressOpen] = useState(false);
const [errorMessage, setErrorMessage] = useState<string | null>(null);
const [isMobileNumberValid, setIsMobileNumberValid] = useState(false);

useEffect(() => {
  setIsMobileNumberValid(validateMobileNumber(mobileNumber));
}, [mobileNumber]);

useEffect(() => {
  if (selectedAdress) {
    setIsPopupOpen(false);
    setIsPopupAddressOpen(true);
  }
}, [selectedAdress]);

const validateMobileNumber = (value: string): boolean => {
  const isValid = /^\d{10}$/.test(value);
  setErrorMessage(isValid ? null : "Please enter a valid 10-digit mobile number.");
  return isValid;
};

const handleSelectedAddress = (data: any) => {
  if (data !== selectedAdress) {
    setSelectedAdress(data);
  }
};

const handleConfirm = () => {
  if (isMobileNumberValid) {
    onConfirm(mobileNumber);
    handleClose();
  }
};

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
const onHandleSaveAddress = (data:any) => {
  onSaveAddress(data);
  setIsPopupAddressOpen(false);
}

const onOtpAddressConfirm = (data:any) => {
  onOtpConfirm(data);
  setIsPopupOpen(true);
}

  return (
    <registerMobileNoPopupWrapper data-testid="registerMobileNoPopup">
      <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex justify-center items-center bg-gradient-to-br from-gray-900 to-black"
    >
      <Dialog
        open={open}
        onClose={(event, reason) => reason !== "backdropClick" && handleClose()}
        fullWidth
        maxWidth="xs"
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "20px",
            backdropFilter: "blur(10px)",
            background: "rgba(255, 255, 255, 0.1)",
            boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.3)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            padding: "20px",
          },
        }}
      >
        <DialogTitle className="relative flex justify-center text-white">
          <h3 className="text-lg font-semibold">Welcome to ClubnCart</h3>
          {/* <CloseIcon className="hidden absolute right-4 cursor-pointer text-gray-400 hover:text-white" onClick={handleClose} /> */}
        </DialogTitle>

        <DialogContent>
          <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="space-y-3">
            <p className="text-center text-gray-300 text-sm">
              Login or Signup to your account for a better experience.
            </p>

            <div className="relative">
              <input
                type="text"
                className={`w-full p-3 rounded-xl text-sm text-white bg-transparent border ${
                  errorMessage ? "border-red-500" : "border-gray-400"
                } outline-none transition-all focus:ring-2 focus:ring-orange-400`}
                placeholder="+91 Enter Mobile Number"
                value={mobileNumber}
                onChange={(e) => {
                  setMobileNumber(e.target.value);
                  validateMobileNumber(e.target.value);
                }}
              />
              {/* <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">+91</span> */}
            </div>

            {errorMessage && <p className="text-yellow-500 text-xs">{errorMessage}</p>}
          </motion.div>
        </DialogContent>

        <DialogActions className="flex justify-center pb-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full px-4 py-3 text-black font-semibold bg-menuHilight rounded-xl shadow-md hover:shadow-lg transition-all"
            disabled={mobileNumber.length !== 10}
            onClick={handleConfirm}
          >
            Continue
          </motion.button>
        </DialogActions>
      </Dialog>
    </motion.div>
                <OtpComponent
                  open={otpOpen}
                  handleClose={handleOtpClose}
                  onConfirm={onOtpAddressConfirm} // Pass the callback 
                />
                <AddressMapComponent open={isPopupOpen} handleClose={handleClosePopup} onSave={handleSelectedAddress}/>
                <MdAddressDetailsPopup
        open={isPopupAddressOpen}
        onSave={onHandleSaveAddress}
        handleClose={handleAddressClose} mapAddr={selectedAdress}                />
    </registerMobileNoPopupWrapper>
  );
};

export default RegisterMobileNoPopup;
