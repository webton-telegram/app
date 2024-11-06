import { type ReactNode, useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';

import AuthContext from 'context/AuthContext';
import { auth } from 'service/api/auth';

import type { AuthState } from 'types/auth';

const initialState = { status: 'loading' as const };

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>(initialState);

  useEffect(() => {
    let ignore = false;

    const autorize = async () => {
      const { initData } = WebApp;

      const res = await auth({
        telegramInitData: initData,
        // set VITE_TG_BOT_TOKEN to .env.local
        botToken: import.meta.env.VITE_TG_BOT_TOKEN,
      });

      if (!ignore) {
        localStorage.setItem('webton_access-token', res.accessToken);
        setState({
          status: 'authenticated' as const,
          session: res,
        });
      }
    };

    autorize();

    return () => {
      ignore = true;
    };
  }, []);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
