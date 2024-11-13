import api from 'service/api/index';

import type { RequestToonListParams, ToonListData, ToonItem } from 'types/toon';
import type { ResponseData } from 'types/fetch';

export const getToonList = async (
  params: RequestToonListParams,
): Promise<ToonListData> => {
  const { data } = await api.get<ResponseData<ToonListData>>('/v1/toon/list', {
    params,
  });

  return data.data;
};

export const getToonDetail = async (toonId: number): Promise<ToonItem> => {
  const { data } = await api.get<ResponseData<ToonItem>>(
    `/v1/toon?id=${toonId}`,
  );

  return data.data;
};

export default null;
