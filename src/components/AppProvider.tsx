import { type ReactNode, useEffect } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import WebApp from '@twa-dev/sdk';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import AuthProvider from 'components/AuthProvider';

import 'react-toastify/dist/ReactToastify.css';
import ToastContainer from 'components/ToastContainer';

type Props = {
  children: ReactNode;
};

const queryClient = new QueryClient();

const AppProvider = ({ children }: Props) => {
  useEffect(() => {
    WebApp.expand();
  }, []);

  return (
    <AuthProvider>
      <TonConnectUIProvider
        manifestUrl={`${import.meta.env.VITE_HOST}/tonconnect-manifest${import.meta.env.DEV ? '-local' : ''}.json`}
      >
        <QueryClientProvider client={queryClient}>
          <NextUIProvider>
            <NextThemesProvider attribute="class">
              {children}
              <ToastContainer />
            </NextThemesProvider>
          </NextUIProvider>
        </QueryClientProvider>
      </TonConnectUIProvider>
    </AuthProvider>
  );
};

export default AppProvider;
