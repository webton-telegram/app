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

export type RequestToonListParams = {
  page: number;
  limit: number;
  orderBy: 'latest' | 'popular';
  sort: 'DESC' | 'ASC';
  searchText?: string;
};

export type ToonListData = {
  total: number;
  list: ToonItem[];
};
