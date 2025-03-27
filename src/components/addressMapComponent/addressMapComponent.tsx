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
             style={{ position: 'absolute', right: 8, top: 8, display:'none' }}
           >
             <CloseIcon />
           </IconButton>
         </DialogTitle>
         <DialogContent>
            <MapLibreWithSuggestions deliveryAddress={handleGetAddress}/>
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
)};

export default addressMapComponent;
