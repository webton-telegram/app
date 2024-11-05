import type { UserInfo } from 'types/user';

export type RequestAuthParams = {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  photo_url: string;
  auth_date: number;
  hash: string;
};

export type ResultAuthData = {
  accessToken: string;
  refreshToken: string;
  user: UserInfo;
};
