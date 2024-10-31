/* eslint-disable @typescript-eslint/naming-convention */

import { useState, useEffect } from 'react';
import { parseInitData } from '@telegram-apps/sdk';

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initData?: {
          user?: {
            id: number;
            firstName: string;
            lastName: string;
            username: string;
            languageCode?: string;
            isPremium: boolean;
            photoUrl?: string;
            allowsWriteToPm: boolean;
          };
          authDate: Date | null;
          hash: string;
          startParam: string;
          chatType: string;
          chatInstance: string;
        };
        ready: () => void;
      };
    };
  }
}

type TelegramAuthData = {
  user?: {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    photoUrl?: string;
    languageCode?: string;
    isPremium: boolean;
    allowsWriteToPm: boolean;
  };
  hash: string;
  authDate: Date | null;
  startParam: string;
  chatType: string;
  chatInstance: string;
};

const useTelegramAuth = () => {
  const [isTelegramView, setIsTelegramView] = useState(false);
  const [telegramAuthData, setTelegramAuthData] = useState<TelegramAuthData>({
    user: {
      id: 0,
      firstName: '',
      lastName: '',
      username: '',
      languageCode: '',
      isPremium: false,
      allowsWriteToPm: false,
    },
    hash: '',
    authDate: null,
    startParam: '',
    chatType: '',
    chatInstance: '',
  });

  useEffect(() => {
    const { initData } = window.Telegram.WebApp;
    setIsTelegramView(!!initData);
    if (!initData) return;

    const parseData = parseInitData(initData) as TelegramAuthData;

    setTelegramAuthData({
      ...parseData,
    });
  }, []);

  return { isTelegramView, telegramAuthData };
};

export default useTelegramAuth;
