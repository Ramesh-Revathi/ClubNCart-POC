import axiosClient from './axios-client';
import { AxiosPromise } from 'axios';

interface userProfile {
  name: any,
  mailid: any,
  mobile: any,
  address: [
    {
      street: any,
      area: any,
      addressType: any
    }
  ]
}

export function loginViaEmail(email: string): AxiosPromise<any> {
  const payload = { email };
  return axiosClient.post('/login/otp/email/send', payload);
}

export function verifyEmail(email: string, otp: string): AxiosPromise<any> {
  const payload = { email, otp };
  return axiosClient.post('/login/otp/email/verify', payload);
}

export function loginViaMobile(mobile: string): AxiosPromise<any> {
  const payload = { country_code: '+91', phone: mobile };
  return axiosClient.post('/login/otp/phone/send', payload);
}

export function verifyMobile(mobile: string, otp: string): AxiosPromise<any> {
  const payload = { country_code: '+91', phone: mobile, otp };
  return axiosClient.post('/login/otp/phone/verify', payload);
}

export function logoutUser(): AxiosPromise<any> {
  return axiosClient.post('/logout');
}

export function getLoggedInUser(): AxiosPromise<any> {
  return axiosClient.get('/auth/user');
}

export function saveUser(user: userProfile): AxiosPromise<userProfile> {
  return axiosClient.post('http://localhost:5000/saveuser', user);
}

export function userlogin(mobile: any): AxiosPromise<any> {
  return axiosClient.post('http://localhost:5000/login', mobile);
}

export function addCart(data: any): AxiosPromise<any> {
  return axiosClient.post('http://localhost:5000/addcart', data);
}

export function removeCart(data: any): AxiosPromise<any> {
  return axiosClient.post('http://localhost:5000/removecart', data);
}


export function getCart(data: any): AxiosPromise<any> {
  return axiosClient.post('http://localhost:5000/getcart', data);
}

export function placeOrder(mobile: any): AxiosPromise<any> {
  return axiosClient.post('http://localhost:5000/placeOrder', mobile);
}

export function getOrder(mobile: any): AxiosPromise<any> {
  return axiosClient.post('http://localhost:5000/getOrder', mobile);
}

export function getAddress(mobile: any): AxiosPromise<any> {
  return axiosClient.post('http://localhost:5000/getAddress', mobile);
}

export function getAddressForCart(mobile: any): AxiosPromise<any> {
  return axiosClient.post('http://localhost:5000/getAddressForCart', mobile);
}


