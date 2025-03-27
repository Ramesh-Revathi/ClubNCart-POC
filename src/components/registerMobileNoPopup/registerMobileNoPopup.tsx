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
      <div className="flex justify-center items-center">
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
        borderRadius: "2px",
        margin: "0",
        position: "absolute",
        bottom: { xs: 0, sm: "auto" },
        transform: { xs: "translateY(0)", sm: "translateY(-50%)" },
        top: { sm: "50%" },
        left: { sm: "50%" },
        transformOrigin: "center",
        width: "100%",
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
        style={{ position: "absolute", right: 8, top: 8, display: "none" }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    <DialogContent>
      <Typography variant="body2" className="pb-4">
        <div>
          <h3 className="text-sm leading-8 text-left text-black font-medium">
            Welcome to ClubnCart
          </h3>
          <div className="text-xs font-light">
            Login or Signup to your account for a better experience
          </div>
        </div>
      </Typography>
      <div className="input-group mb-0">
        <span className="input-group-text" id="inputGroup-sizing-default">
          +91
        </span>
        <input
          type="text"
          className={`form-control ${errorMessage ? "border-red-500" : ""}`}
          aria-label="Mobile number input"
          aria-describedby="inputGroup-sizing-default"
          value={mobileNumber}
          placeholder="Enter Mobile Number"
          onChange={(e) => {
            const value = e.target.value;
            setMobileNumber(value);
            validateMobileNumber(value);
          }}
        />
      </div>
      {errorMessage && (
        <div className="text-xs text-red-500 mt-1">{errorMessage}</div>
      )}
    </DialogContent>
    <DialogActions style={{ paddingBottom: "25px" }}>
      <Button
        style={{ backgroundColor: "#fff6a3", color: "black" }}
        onClick={handleConfirm}
        className="w-full text-gray-500"
        variant="contained"
        disabled={!isMobileNumberValid}
      >
        Continue
      </Button>
    </DialogActions>
  </Dialog>
      </div>
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
