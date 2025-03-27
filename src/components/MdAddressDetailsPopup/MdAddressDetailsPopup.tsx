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
          '& .MuiPaper-root': {
            borderRadius: '20px',
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
        <DialogTitle sx={{ mr: 2 }}>
          <Typography variant="subtitle1" align="left">
            Add Address Details
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ fontSize: 11, color: 'gray' }}
            align="left"
          >
            Note: Detailed address will help our delivery partner reach your
            place easily
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            style={{ position: 'absolute', right: 8, top: 8, display: 'none' }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Enter Full Name*"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Enter House / Flat / Block No*"
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Road / Area / Locality*"
            value={addressLine2}
            multiline
            minRows={3}
            onChange={(e) => setAddressLine2(e.target.value)}
            margin="normal"
          />

          {/* Custom Address Type Selector */}
          <Typography variant="subtitle1" align="left" sx={{ mt: 2, mb: 1 }}>
            Address Type
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant='outlined'
              onClick={() => setAddressType('Home')}
              sx={{
                flex: 1,
                textTransform: 'none',

                color: addressType === 'Home' ? 'black' : 'gray',
                borderColor: addressType === 'Home' ? '#e7d30b' : 'gray',

                '&:hover': {
                  borderColor: 'black',
                },
              }}
            >
              Home
            </Button>
            <Button
              variant='outlined'
              onClick={() => setAddressType('Office')}
              sx={{
                flex: 1,
                textTransform: 'none',

                color: addressType === 'Office' ? 'black' : 'gray',
                borderColor: addressType === 'Office' ? '#e7d30b' : 'gray',

                '&:hover': {
                  borderColor: 'black',
                },
              }}
            >
              Office
            </Button>
            <Button
              variant='outlined'
              onClick={() => setAddressType('Other')}
              sx={{
                flex: 1,
                textTransform: 'none',
                //   backgroundColor: addressType === 'Other' ? '#fff6a3' : 'transparent',
                color: addressType === 'Other' ? 'black' : 'gray',
                borderColor: addressType === 'Other' ? '#e7d30b' : 'gray',

              }}
            >
              Other
            </Button>
          </Box>
        </DialogContent>
        <DialogActions style={{ paddingBottom: '25px' }}>
          <Button
            style={{ backgroundColor: '#fdea2c', color: 'black' }}
            onClick={handleSave}
            className="w-full text-gray-500"
            variant="contained"
          >
            Save Address
          </Button>
        </DialogActions>
      </Dialog>
    </MdAddressDetailsPopupWrapper>
  );
};

export default MdAddressDetailsPopup;