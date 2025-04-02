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
import { MdAddressDetailsPopupWrapper } from './MdAddressDetailsPopup.styled';
import { motion } from 'framer-motion';

interface MdAddressDetailsPopupProps {
  open: boolean;
  handleClose: () => void;
  onSave: (address: {
    fullName: string;
    addressLine1: string;
    addressLine2: string;
    addressType: string;
  }) => void;
  mapAddr: any;
}

const MdAddressDetailsPopup: FC<MdAddressDetailsPopupProps> = ({
  open,
  handleClose,
  onSave,
  mapAddr
}) => {
  const [fullName, setFullName] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [addressType, setAddressType] = useState('Home'); // Default to 'Home'

  const handleSave = () => {
    const addressDetails = {
      fullName,
      addressLine1,
      addressLine2,
      addressType,
    };
    onSave(addressDetails);
    handleClose();
  };

  useEffect(() => {
    if (mapAddr) {
      setAddressLine2(mapAddr);
    }
  }, [mapAddr])

  return (
    <MdAddressDetailsPopupWrapper data-testid="MdAddressDetailsPopup">
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
      borderRadius: "20px",
      background: "rgba(255, 255, 255, 0.1)", // Glassmorphism effect
      boxShadow: "0px 4px 30px rgba(34, 197, 94, 0.3)", // Green soft glow
      backdropFilter: "blur(20px)", // Frosted glass effect
      border: "1px solid rgba(255, 255, 255, 0.2)", // Subtle border
      bottom: { xs: 0, sm: "auto" },
      transform: { xs: "translateY(0)", sm: "translateY(-50%)" },
      top: { sm: "50%" },
      left: { sm: "50%" },
      transformOrigin: "center",
      width: "100%",
    },
  }}
>
  {/* Animated Dialog Title */}
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
  >
    <DialogTitle sx={{ textAlign: "center", color: "white" }}>
      <Typography variant="h6" fontWeight="bold">
        Add Address Details
      </Typography>
      <Typography variant="subtitle2" sx={{ fontSize: 11, color: "rgba(255, 255, 255, 0.7)" }}>
        Note: A detailed address helps delivery partners reach you easily.
      </Typography>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{ position: "absolute", right: 8, top: 8, color: "white" }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
  </motion.div>

  {/* Animated Dialog Content */}
  <DialogContent>
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
    >
      {["Enter Full Name*", "Enter House / Flat / Block No*", "Road / Area / Locality*"].map((label, index) => (
        <TextField
          key={index}
          fullWidth
          label={label}
          value={index === 0 ? fullName : index === 1 ? addressLine1 : addressLine2}
          onChange={(e) =>
            index === 0 ? setFullName(e.target.value) : index === 1 ? setAddressLine1(e.target.value) : setAddressLine2(e.target.value)
          }
          margin="normal"
          variant="outlined"
          multiline={label === "Road / Area / Locality*"}
          minRows={label === "Road / Area / Locality*" ? 3 : 1}
          sx={{
            "& .MuiOutlinedInput-root": {
              background: "rgba(255, 255, 255, 0.2)",
              borderRadius: "10px",
              color: "white",
              borderColor: "rgba(255, 255, 255, 0.4)",
            },
            "& .MuiInputLabel-root": {
              color: "white !important", // Ensuring white label color
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255, 255, 255, 0.4)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#F2C44C", // Golden border on hover
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#F2C44C", // Golden border when focused
            },
          }}
        />
      ))}

      {/* Address Type Selector */}
      <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, color: "#F2C44C" }}>
        Address Type
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        {["Home", "Office", "Other"].map((type) => (
          <Button
            key={type}
            variant="outlined"
            onClick={() => setAddressType(type)}
            sx={{
              flex: 1,
              textTransform: "none",
              color: addressType === type ? "#065f46" : "#F2C44C",
              borderColor: addressType === type ? "#F2C44C" : "rgba(255, 255, 255, 0.5)",
              backgroundColor: addressType === type ? "rgba(242, 196, 76, 0.2)" : "transparent",
              "&:hover": {
                borderColor: "#F2C44C",
                backgroundColor: "rgba(242, 196, 76, 0.3)",
              },
            }}
          >
            {type}
          </Button>
        ))}
      </Box>
    </motion.div>
  </DialogContent>

  {/* Animated Dialog Actions */}
  <DialogActions sx={{ pb: 3, display: "flex", justifyContent: "center" }}>
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.4, ease: "easeOut" }}
      className="w-full"
    >
      <Button
        sx={{
          width: "100%",
          background: "#F2C44C",
          color: "white",
          fontWeight: "bold",
          borderRadius: "12px",
          boxShadow: "0px 4px 10px rgba(242, 196, 76, 0.4)",
          "&:hover": { background: "#E0B040" },
        }}
        onClick={handleSave}
        variant="contained"
      >
        Save Address
      </Button>
    </motion.div>
  </DialogActions>
</Dialog>
    </MdAddressDetailsPopupWrapper>
  );
};

export default MdAddressDetailsPopup;