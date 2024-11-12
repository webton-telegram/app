import api from 'service/api/index';

import type {
  RequestEpisodeListParams,
  EpisodeListData,
  EpisodeData,
} from 'types/episode';
import type { ResponseData } from 'types/fetch';

export const getEpisodeList = async (
  params: RequestEpisodeListParams,
): Promise<EpisodeListData> => {
  const { data } = await api.get<ResponseData<EpisodeListData>>(
    '/v1/toon/episode/list',
    {
      params,
    },
  );

  return data.data;
};

export const getEpisode = async (episodeId: number): Promise<EpisodeData> => {
  const { data } = await api.get<ResponseData<EpisodeData>>(
    `/v1/toon/episode?episodeId=${episodeId}`,
  );
  return data.data;
};
