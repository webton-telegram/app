import axios, { AxiosError } from 'axios';

import ResponseError from 'service/api/error';

import type { ResponseErrorData } from 'types/fetch';

const baseURL = import.meta.env.VITE_API_SERVER_HOST;

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
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
