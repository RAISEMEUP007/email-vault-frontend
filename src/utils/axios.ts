// src/utils/axios.ts

import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 1000,
});

axiosInstance.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
