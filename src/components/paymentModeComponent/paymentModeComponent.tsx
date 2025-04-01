import {
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   IconButton,
   Typography,
   Box,
 } from '@mui/material';
 import { FC, useEffect, useState } from 'react';
 import CloseIcon from '@mui/icons-material/Close';
 import { paymentModeComponentWrapper } from './paymentModeComponent.styled';

 import{updatePaymentMode} from '../../services/auth-handler.service';
 
 interface PaymentModeComponentProps {
   pgOpen: boolean;
   totalAmount:number;
   handlePgClose: () => void;
 }
 
 const PaymentModeComponent: FC<PaymentModeComponentProps> = ({
   pgOpen,
   handlePgClose,
   totalAmount
 }) => {
   const [selectedPaymentMode, setSelectedPaymentMode] = useState<string>('online');
 
   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
     setSelectedPaymentMode(event.target.value);
   };

  // useEffect(() => {
  //      const fetchData = async () => {
  //         console.log('modeResponse');
    
  //         const userdataObj = JSON.parse(sessionStorage.getItem('userData') || '[]').user;
  //         const modeResponse = await updatePaymentMode(userdataObj?.mobile, selectedPaymentMode);
  //         console.log('modeResponse', modeResponse);
  //       };
  //       fetchData();

  // }, [selectedPaymentMode]);
 
   return (
     <paymentModeComponentWrapper data-testid="paymentModeComponent">
       <Dialog
         open={pgOpen}
         onClose={handlePgClose}
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
           <div className="text-base font-medium">Select Payment Mode</div>
           <IconButton
             aria-label="close"
             onClick={handlePgClose}
             style={{ position: 'absolute', right: 8, top: 8 }}
           >
             <CloseIcon />
           </IconButton>
         </DialogTitle>
         <hr />
         <DialogContent style={{ padding: '10px' }}>
           <div className="flex flex-col space-y-1">
             {/* Online Payment */}
             <label className="flex items-center cursor-pointer w-full border rounded-lg p-4">
               <img
                 src="https://services.kpnfresh.com/media/v1/static/images/payment-options-online.svg?channel=and"
                 alt="Online Payment"
                 className="w-6 h-6 object-cover mr-4"
               />
               <span className="text-sm font-medium text-gray-900 flex-1">
                 Online Payment
               </span>
               <input
                 type="radio"
                 name="payment_mode"
                 value="online"
                 checked={selectedPaymentMode === 'online'}
                 onChange={handleChange}
                 className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
               />
             </label>
 
             {/* Cash on Delivery */}
             <label className="flex items-center cursor-pointer w-full border rounded-lg p-4">
               <img
                 src="https://services.kpnfresh.com/media/v1/static/images/payment-options-cod.svg?channel=and"
                 alt="Cash on Delivery"
                 className="w-6 h-6 object-cover mr-4"
               />
               <span className="text-sm font-medium text-gray-900 flex-1">
                 Cash on Delivery (COD)
               </span>
               <input
                 type="radio"
                 name="payment_mode"
                 value="cod"
                 checked={selectedPaymentMode === 'cod'}
                 onChange={handleChange}
                 className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
               />
             </label>
             <p className="text-sm text-semantic-alert">
               We recommend you use the online payment mode for contactless delivery.
             </p>
           </div>
         </DialogContent>
         <hr />
         <DialogActions style={{ paddingBottom: '25px' }}>
           <div className="flex-1 flex h-full justify-between items-center rounded-lg lg:rounded-2xl bg-menuHilight py-2 px-4 cursor-pointer">
             <div>
               <div className="text-sm">Total Payable</div>
               <div className="text-base font-bold">
                 <span className="ruppee-symbol-font">₹</span> {totalAmount}
               </div>
             </div>
             <a href="/pay" className="text-sm font-bold" style={{textDecoration: "none"}}>Pay Now</a>
           </div>
         </DialogActions>
       </Dialog>
     </paymentModeComponentWrapper>
   );
 };
 
 export default PaymentModeComponent;
 