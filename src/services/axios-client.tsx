import axios, { AxiosInstance } from 'axios';

const axiosClient: AxiosInstance = axios.create({
  baseURL: 'https://api.clubandcart.com',
  withCredentials: true,
});

export function setCsrfToken(token: string): void {
  axiosClient.defaults.headers.common['X-CSRF-TOKEN'] = token;
}

export default axiosClient;
