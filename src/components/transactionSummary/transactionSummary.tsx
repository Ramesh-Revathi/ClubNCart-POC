import React, { FC, useEffect, useState } from 'react';
import { transactionSummaryWrapper } from './transactionSummary.styled';
import { useNavigate } from 'react-router-dom';
import { getLoggedInUser, placeOrder } from '../../services/auth-handler.service';

interface transactionSummaryProps {
   transactionId:any;
   amount:any;
   date:any;
}

const transactionSummary: FC<transactionSummaryProps> = ({ transactionId=0, amount=0, date=null }) => {
  const navigate = useNavigate();
const [userdata, setUserData] = useState<any>();
  const navigateToOrder = () => {
    debugger
    navigate("/order", { replace: true });
  }
    useEffect(() => {
      console.log("userData",JSON.parse(localStorage.getItem("userData")|| "[]"));
      try {
        setUserData(JSON.parse(localStorage.getItem("userData")|| "[]"));
      } catch (error) {
        console.error("Error parsing cart data from sessionStorage:", error);
      }
    }, [transactionId]);
    useEffect(() => {
      console.log("userdata",userdata);
      if(transactionId && userdata){
        placeOrderFun();
      }
    },[userdata])
    const placeOrderFun = async () => {
      try {
        if (!userdata || !userdata.mobile) {
          console.error("User data is missing or invalid. Cannot place order.");
          sessionStorage.removeItem('cartItemCount');
          return;
        }
    
        const payload = {
          mobile: userdata.mobile,
          transactionId,
          amount,
          date,
        };
    
        console.log("Placing order with payload:", payload);
    
        const response = await placeOrder(payload);
    
        if (response?.status === 200) {
          console.log("Order placed successfully:", response);
          // Add any additional actions here, like updating UI or state
        } else {
          console.error("Failed to place order. Response:", response);
        }
      } catch (error) {
        console.error("Error while placing order:", error);
      }
    };
    
  return (
 <transactionSummaryWrapper data-testid="transactionSummary">
    <div className="flex flex-col items-center justify-center bg-white-100">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
        {/* Loader Animation */}
        <div className="flex items-center justify-center mb-4">
          <div className="animate-spin rounded-full h-44 w-44 border-t-4 border-green-500 border-solid"></div>
        </div>
        {/* Success Message */}
        <h1 className="text-2xl font-semibold text-green-600">Yay!</h1>
        <h1 className="text-2xl font-semibold text-green-600">Order Placed Successful!</h1>
        <p className="text-gray-600 mt-2">Your transaction was completed successfully.</p>
        
        {/* Transaction Details */}
        <div className="mt-6 border-t pt-4 text-left">
          <p className="text-sm text-gray-500">
            <span className="font-medium text-gray-700">Transaction ID:</span> {transactionId}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            <span className="font-medium text-gray-700">Amount:</span> <span className="ruppee-symbol-font">₹</span> {amount}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            <span className="font-medium text-gray-700">Date:</span> {date}
          </p>
        </div>

        {/* CTA */}
        <button
          className="mt-6 w-full bg-menuHilight text-gray-700 font-medium py-2 rounded-lg hover:bg-menuHilight transition duration-300"
          onClick={navigateToOrder}
        >
          Track Your Order
        </button>
      </div>
    </div>
 </transactionSummaryWrapper>
)};

export default transactionSummary;
