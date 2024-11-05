import axios, { AxiosError } from 'axios';

import ResponseError from 'service/api/error';

import type { ResponseErrorData } from 'types/fetch';

const baseURL = '/api';

const api = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ResponseErrorData>) => {
    console.log(error);
    const message = error?.response?.data?.message || 'Something went wrong';
    const code = error?.response?.data?.code || 'UNKNOWN_ERROR';
    const traceId = error?.response?.data?.traceId;

    return Promise.reject(new ResponseError(message, code, traceId));
  },
);

export default api;
