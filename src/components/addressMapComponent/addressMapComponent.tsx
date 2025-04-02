import {
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   IconButton,
   TextField,
   Typography,
   Box,
 } from '@mui/material';
 import TextareaAutosize from '@mui/material/TextareaAutosize';
 import { FC, useEffect, useState } from 'react';
 import CloseIcon from '@mui/icons-material/Close';
import { addressMapComponentWrapper } from './addressMapComponent.styled';
import MapLibreWithSuggestions from '../MapComponent/MapComponent';
import { motion } from 'framer-motion';

interface addressMapComponentProps {   open: boolean;
   handleClose: () => void;
   onSave: (data:any) => void;}

const addressMapComponent: FC<addressMapComponentProps> = ({
   open,
   handleClose,
   onSave,
 }) => {
     const [selectedAddress, setSelectedAddress] = useState<string>("");
   const handleSave = () => {
      onSave(selectedAddress);
      handleClose();
    };
    const handleGetAddress = (data:any) => {
      console.log("handleGetAddress",data)
      setSelectedAddress(data);
    };
     useEffect(() => {
      
     },[selectedAddress])
   return(
    <motion.div
  initial={{ opacity: 0, scale: 0.9, y: 50 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  exit={{ opacity: 0, scale: 0.9, y: 50 }}
  transition={{ duration: 0.4, ease: "easeOut" }}
  className="fixed flex items-end sm:items-center justify-center z-50 px-4"
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
        borderRadius: "16px",
        position: "relative",
        backdropFilter: "blur(18px)",
        background: "rgba(255, 255, 255, 0.25)",  // More visible background
        boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.3)",
        padding: "18px",
        width: "100%",
        maxWidth: "380px",
        bottom: { xs: 0, sm: "auto" },
        transform: { xs: "translateY(0)", sm: "translateY(-50%)" },
        top: { sm: "50%" },
        left: { sm: "50%" },
        transformOrigin: "center",
      },
    }}
  >
    <DialogTitle sx={{ mr: 2, pb: 1 }}>
      <Typography 
        variant="subtitle1" 
        align="left" 
        fontWeight="bold" 
        sx={{ color: "#ffffff" }} // Pure white for clarity
      >
        Add Address Details
      </Typography>
      <Typography 
        variant="subtitle2" 
        sx={{ fontSize: 12, color: "rgba(255, 255, 255, 0.85)" }} 
        align="left"
      >
        Note: A detailed address will help our delivery partner reach you easily.
      </Typography>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{ position: "absolute", right: 8, top: 8, color: "white" }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>

    <DialogContent sx={{ paddingX: 1 }}>
      <MapLibreWithSuggestions deliveryAddress={handleGetAddress} />
    </DialogContent>

    <DialogActions sx={{ paddingBottom: "16px", paddingX: 1 }}>
      <Button
        sx={{
          backgroundColor: "#F2C44C",
          color: "#222",  // Darker text for better contrast
          fontSize: "14px",
          fontWeight: "700",
          paddingY: "12px",
          borderRadius: "12px",
          width: "100%",
          boxShadow: "0px 4px 12px rgba(255, 235, 59, 0.5)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0px 6px 18px rgba(255, 235, 59, 0.7)",
          },
        }}
        onClick={handleSave}
        variant="contained"
      >
        Submit
      </Button>
    </DialogActions>
  </Dialog>
</motion.div>
)};

export default addressMapComponent;
