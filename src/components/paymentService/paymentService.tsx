import React, { FC, useEffect, useRef, useState } from "react";
import { paymentServiceWrapper } from "./paymentService.styled";
import { Alert, Button, CircularProgress } from "@mui/material"; // Import CircularProgress for the loading spinner
import { getPaymentsession } from "../../services/payment.service.";
import TransactionSummaryStories from "../transactionSummary/transactionSummary.stories";
import TransactionSummary from "../transactionSummary/transactionSummary";
import { ShieldCheckIcon, XCircleIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const paymentsConfig = {
  account_id: "60034020706",
  domain: "IN",
  otherOptions: {
    api_key: "1003.a622cfb88c174ed369f49563057b8dd3.9632f926ab78d40b922fc789ebe0e16c",
  },
};

declare global {
  interface Window {
    ZPayments: any;
  }
}

interface paymentServiceProps {}

const TimestampToDateTime = (timestamp: number): string => {
  const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
  return date.toLocaleString(); // Return a formatted date and time string
};


const paymentService: FC<paymentServiceProps> = () => {
  const [paymentAmount, setPaymentAmount] = useState<number>(0.0);
  const [paymentDescription, setPaymentDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
  const [valError, setValError] = useState<boolean>(false);
  const [paySessionError, setPaySessionError] = useState<boolean>(false);
  const [transactionData,setTransactionData] = useState<any>(null);
  const navigate = useNavigate();
  let userDetail:any;

  // Use useRef to store the instance
  const zPaymentsInstance = useRef<any>(null);

  useEffect(() => {
    setIsLoading(true);
    const script = document.createElement("script");
    script.src = "https://static.zohocdn.com/zpay/zpay-js/v1/zpayments.js";
    script.async = true;

    script.onload = () => {
      zPaymentsInstance.current = new window.ZPayments(paymentsConfig); // Initialize and store in useRef
      requestPayment(); 
   };

    document.body.appendChild(script);
    setTimeout(() => {
      const loader = document.querySelector(".zpayments-loader-icon");
      if (loader) {
        loader.remove();
      }
    }, 5500); // Adjust the delay as needed

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  useEffect(() => {
    if (transactionData) {
    }else{
      //navigate("/cart")
    }
  }, [transactionData]);

  const requestPayment = () => {
   const sessionCartAmountObj:any = JSON.parse(
      sessionStorage.getItem("cartAmount") || ""
    );
   if(sessionCartAmountObj){
      if (sessionCartAmountObj.total && "test") {
         setValError(false);
         getPaymentsession(sessionCartAmountObj.total.toFixed(2), "test")
           .then((response: any) => {
             setPaySessionError(false);
             proceedToPaymentPage(response.data.payment_session);
           })
           .catch(() => {
             setPaySessionError(true);
           });
       } else {
         setValError(true);
       }
   }
  };

  const proceedToPaymentPage = async (session: any) => {
    if (!zPaymentsInstance.current) {
      console.error("ZPayments instance is not initialized.");
      return;
    }

    try {
      const options = {
        amount: session.amount.toFixed(2),
        currency_code: session.currency,
        payments_session_id: session.payment_session_id,
        currency_symbol: "₹",
        business: "Clubncart",
        description: session.created_time.toString(),
        date: TimestampToDateTime(session.created_time),
      };

      const data = await zPaymentsInstance.current.requestPaymentMethod(options);
    //   {
    //     "payment_id": "4396000000135025",
    //     "message": "Payment successful!"
    // }
      // Handle payment success (data contains payment_id and message)
      setTransactionData({"payment_id":data.payment_id, "data":options});
      setIsLoading(false);
    } catch (error: any) {
      if (error.code !== "widget_closed") {
        setIsLoading(false);
        console.error("Payment error:", error);
      }
    } finally {
      await zPaymentsInstance.current.close();
      setIsLoading(false);
    }
  };
  const handleRetry = () => {
    // Add logic to retry the payment or redirect to another page
    navigate("/cart");
  };
  return (
    <paymentServiceWrapper data-testid="paymentService">
            {isLoading ? (
              <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
              <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg space-y-4">
                <CircularProgress size={300} thickness={5} /> {/* Larger size */}
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-700">
                    Redirecting to a secure payment gateway...
                  </p>
                  <p className="text-sm text-gray-500">Please do not refresh or close this page.</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 mt-6 text-gray-600">
                <ShieldCheckIcon className="h-8 w-8 text-green-500" /> {/* Larger shield icon */}
                <span className="text-sm">
                  Your payment is processed securely with end-to-end encryption.
                </span>
              </div>
            </div>
      ) : transactionData ? (
      <TransactionSummary
      transactionId={transactionData.payment_id}
      amount={transactionData.data.amount}
      date={transactionData.data.date}
    />
  ):(
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        <XCircleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Payment Cancelled
        </h1>
        <p className="text-gray-600 mb-6">
          It seems like you cancelled the payment process. If this was a mistake, you can try again.
        </p>
        <Button
          variant="contained"
          color="primary"
          onClick={handleRetry}
          className="w-full"
        >
          Retry Payment
        </Button>
      </div>
    </div>
  )}
    </paymentServiceWrapper>
  );
};

export default paymentService;
