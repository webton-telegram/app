import type { UserInfo } from 'types/user';

export type RequestAuthParams = {
  telegramInitData: string;
  botToken?: string;
};

export type ResultAuthData = {
  accessToken: string;
  refreshToken: string;
  user: UserInfo;
};
