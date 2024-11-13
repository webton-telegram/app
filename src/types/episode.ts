type Author = {
  id: number;
  socialId: string;
  firstName: string;
  lastName: string;
  userName: string;
  languageCode: string;
  walletAddress: string;
  point: number;
  createdAt: string;
};

export type EpisodeItem = {
  id: number;
  episodeNumber: number;
  viewCount: number;
  likeCount: number;
  title: string;
  thumbnailUrl: string;
  createdAt: string;
  author: Author;
};

export type RequestEpisodeListParams = {
  page: number;
  limit: number;
  toonId: number;
  sort: 'DESC' | 'ASC';
};

export type EpisodeListData = {
  total: number;
  list: EpisodeItem[];
};

export type EpisodeData = {
  episode: EpisodeItem;
  prevEpisode: EpisodeItem | null;
  nextEpisode: EpisodeItem | null;
  url: string;
};
