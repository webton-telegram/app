import api from 'service/api/index';

import type { ResponseData } from 'types/fetch';
import type { RequestSyncWalletParams, ResultGetPayload } from 'types/wallet';

const END_POINT = '/v1/wallet';

export const generatePayload = async (): Promise<ResultGetPayload> => {
  const { data } = await api.get<ResponseData<ResultGetPayload>>(END_POINT);

  return data.data;
};

export const syncWallet = async (
  params: RequestSyncWalletParams,
): Promise<boolean> => {
  const { data } = await api.post<ResponseData<boolean>>(END_POINT, params);

  return data.data;
};
