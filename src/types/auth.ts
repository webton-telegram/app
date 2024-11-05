import type { UserInfo } from 'types/user';

export type RequestAuthParams = {
  telegramInitData: string;
};

export type ResultAuthData = {
  accessToken: string;
  refreshToken: string;
  user: UserInfo;
};
