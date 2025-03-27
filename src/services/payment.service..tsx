import axiosClient from './axios-client';
import { AxiosPromise } from 'axios';

interface PaymentSessionPayload {
  amount: number;
  currency: string;
  meta_data: Array<{ key: string; value: string }>;
}

export function getPaymentsession(amount: number, description: string): AxiosPromise<any> {
  const payload: PaymentSessionPayload = {
    amount: amount,
    currency: 'INR',
    meta_data: [{ key: 'description', value: description }],
  };
  return axiosClient.post('/payments/payment-sessions', payload);
}
