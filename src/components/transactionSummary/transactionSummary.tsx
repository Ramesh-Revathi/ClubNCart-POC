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
<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-300 via-green-400 to-green-600">
  <div className="bg-white rounded-3xl p-8 max-w-lg w-full text-center shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
    {/* Loader Animation */}
    <div className="flex items-center justify-center mb-6">
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-green-500 border-solid"></div>
    </div>
    
    {/* Success Message */}
    <h1 className="text-3xl font-semibold text-green-700 mt-2">Yay!</h1>
    <h1 className="text-3xl font-semibold text-green-700">Order Placed Successfully!</h1>
    <p className="text-gray-700 mt-3 text-lg">Your transaction was completed successfully.</p>

    {/* Transaction Details */}
    <div className="mt-8 border-t pt-6 text-left">
      <p className="text-sm text-gray-600">
        <span className="font-medium text-gray-800">Transaction ID:</span> {transactionId}
      </p>
      <p className="text-sm text-gray-600 mt-2">
        <span className="font-medium text-gray-800">Amount:</span> <span className="text-green-600">₹</span> {amount}
      </p>
      <p className="text-sm text-gray-600 mt-2">
        <span className="font-medium text-gray-800">Date:</span> {date}
      </p>
    </div>

    {/* CTA */}
    <button
      className="mt-8 w-full bg-green-600 text-white font-medium py-3 rounded-xl hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
      onClick={navigateToOrder}
    >
      Track Your Order
    </button>
  </div>
</div>
 </transactionSummaryWrapper>
)};

export default transactionSummary;
