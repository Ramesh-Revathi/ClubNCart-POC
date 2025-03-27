import axiosClient from './axios-client';

export function generateCsrfToken() {
    return axiosClient.get('/csrf');
}