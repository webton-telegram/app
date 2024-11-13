export type ResponseData<T> = {
  result: boolean;
  data: T;
};

export type ResponseErrorData = {
  result: boolean;
  code: string;
  traceId: string;
  message: string;
};

export type ResponseTonCenterError = {
  ok: boolean;
  result: string;
  code: number;
};
