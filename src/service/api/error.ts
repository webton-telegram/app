export class ResponseError extends Error {
  code: string;

  traceId?: string;

  constructor(message: string, code: string, traceId?: string) {
    super(message);
    this.name = 'ResponseError';
    this.code = code;
    this.traceId = traceId;
  }
}

export default ResponseError;
