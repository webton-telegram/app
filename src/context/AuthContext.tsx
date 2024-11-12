import { createContext } from 'react';
import type { ResultAuthData } from 'types/auth';

type AuthState = {
  status: 'loading' | 'authenticated';
  session?: ResultAuthData;
  update: () => Promise<void>;
};

const initialState = {
  status: 'loading' as const,
  update: () => Promise.resolve(),
};

const AuthContext = createContext<AuthState>(initialState);

export default AuthContext;
