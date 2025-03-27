import axiosClient from './axios-client';

import { CATEGORIES_MOCK_DATA } from '../mock-data/categories.mock-data';

export function getAllCategories() {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(CATEGORIES_MOCK_DATA), 500);
    });
    return promise;
    // return axiosClient.get('/categories');
}