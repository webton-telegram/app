type Author = {
  id: number;
  socialId: number;
  firstName: string;
  lastName: string;
  userName: string;
  languageCode: 'en' | 'kr';
  point: number;
  createdAt: string;
};

export type ToonItem = {
  id: number;
  viewCount: number;
  likeCount: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  createdAt: string;
  author: Author;
};

export type EpisodeItem = {
  id: number;
  episodeNumber: number;
  viewCount: number;
  likeCount: number;
  title: string;
  thumbnailUrl: string;
  createdAt: string;
};

export type RequestToonListParams = {
  page: number;
  limit: number;
  orderBy: 'latest' | 'popular';
  sort: 'DESC' | 'ASC';
  searchText?: string;
};

export type RequestEpisodeListParams = {
  page: number;
  limit: number;
  toonId: number;
  // sort: 'DESC' | 'ASC';
};

export type ToonListData = {
  total: number;
  list: ToonItem[];
};

export type EpisodeListData = {
  total: number;
  list: EpisodeItem[];
};
