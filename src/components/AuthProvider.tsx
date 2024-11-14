import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import WebApp from '@twa-dev/sdk';
import { produce } from 'immer';

import AuthContext from 'context/AuthContext';
import { auth, getUserInfo } from 'service/api/auth';

import type { AuthState } from 'types/auth';
import Splash from 'components/Splash';
import NotSupported from 'components/NotSupported';

const initialState = { status: 'loading' as const };

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>(initialState);

  const update = useCallback(async () => {
    const userInfo = await getUserInfo();

    setState(
      produce((draft) => {
        if (draft.session) {
          draft.session.user = userInfo;
        }
      }),
    );
  }, []);

  useEffect(() => {
    let ignore = false;

    const autorize = async () => {
      const { initData } = WebApp;

      try {
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
      } catch (error) {
        setState({
          status: 'unauthenticated' as const,
        });
      }
    };

    autorize();

    return () => {
      ignore = true;
    };
  }, []);

  const key = useMemo(() => ({ ...state, update }), [state, update]);

  return (
    <AuthContext.Provider value={key}>
      {state.status === 'loading' && <Splash />}
      {state.status === 'unauthenticated' && <NotSupported />}
      {state.status === 'authenticated' && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
