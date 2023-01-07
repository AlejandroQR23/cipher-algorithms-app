import axios, { AxiosResponse } from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

export const responseInterceptor = (response: AxiosResponse) => response.data;
