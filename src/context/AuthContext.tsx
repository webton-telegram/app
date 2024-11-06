import { createContext } from 'react';
import type { ResultAuthData } from 'types/auth';

type AuthState = {
  status: 'loading' | 'authenticated';
  session?: ResultAuthData;
};

const initialState = { status: 'loading' as const };

const AuthContext = createContext<AuthState>(initialState);

export default AuthContext;
