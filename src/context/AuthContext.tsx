import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import type { ResultAuthData } from 'types/auth';
import WebApp from '@twa-dev/sdk';
import { auth } from 'service/api/auth';

type AuthState = {
  status: 'loading' | 'authenticated';
  session?: ResultAuthData;
};

const initialState = { status: 'loading' as const };

const AuthContext = createContext<AuthState>(initialState);

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

export const useSession = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useSession must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
