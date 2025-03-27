import React, { FC, useEffect } from 'react';
import { testPaymentWrapper } from './testPayment.styled';

const payments_config = {
  account_id: "60034020706",
  domain: "IN",
  otherOptions: {
    api_key:
      "1003.a622cfb88c174ed369f49563057b8dd3.9632f926ab78d40b922fc789ebe0e16c",
  },
};

declare global {
  interface Window {
    ZPayments: any;
  }
}

const testPayment: FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://static.zohocdn.com/zpay/zpay-js/v1/zpayments.js";
    script.async = true;

    script.onload = async () => {
      console.log("ZPayments loaded");

      // Initialize ZPayments instance after script is loaded
      const instance = new window.ZPayments(payments_config);

      // Call the payment initiation function
      try {
        const options = {
          amount: "2.00",
          currency_code: "INR",
          payments_session_id: "4396000000126109",
          currency_symbol: '₹',
          business: 'Clubncart',
          description: "test",
        };

        let data = await instance.requestPaymentMethod(options);
        console.log("Payment success:", data);
      } catch (err: any) {
        if (err.code !== 'widget_closed') {
          console.error("Payment error:", err);
        }
      } finally {
        await instance.close();
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <testPaymentWrapper data-testid="testPayment">
      testPayment Component
    </testPaymentWrapper>
  );
};

export default testPayment;
