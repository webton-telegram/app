import api from 'service/api/index';

import type { RequestAuthParams, ResultAuthData } from 'types/auth';
import type { ResponseData } from 'types/fetch';

export const auth = async (
  params: RequestAuthParams,
): Promise<ResultAuthData> => {
  const { data } = await api.post<ResponseData<ResultAuthData>>(
    '/v1/auth',
    params,
  );

  return data.data;
};

export default null;
