import axios, { AxiosError } from 'axios';

import ResponseError from 'service/api/error';

import type { ResponseErrorData } from 'types/fetch';

const baseURL = import.meta.env.DEV
  ? '/api'
  : import.meta.env.VITE_API_SERVER_HOST;

const api = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const nextConfig = config;

  const accessToken = localStorage.getItem('webton_access-token');

  if (accessToken) {
    nextConfig.headers.Authorization = `Bearer ${accessToken}`;
  }

  return nextConfig;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ResponseErrorData>) => {
    const message = error?.response?.data?.message || 'Something went wrong';
    const code = error?.response?.data?.code || 'UNKNOWN_ERROR';
    const traceId = error?.response?.data?.traceId;

    return Promise.reject(new ResponseError(message, code, traceId));
  },
);

export default api;
