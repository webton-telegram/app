import { useState, useEffect } from 'react';
import { parseInitData } from '@telegram-apps/sdk';
import WebApp from '@twa-dev/sdk';

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
    const { initData } = WebApp;
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
