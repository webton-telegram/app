import { type ReactNode, useEffect } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import WebApp from '@twa-dev/sdk';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Flip, ToastContainer } from 'react-toastify';

import AuthProvider from 'components/AuthProvider';

import 'react-toastify/dist/ReactToastify.css';

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
            </NextThemesProvider>
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss={false}
              draggable
              pauseOnHover={false}
              theme="colored"
              transition={Flip}
            />
          </NextUIProvider>
        </QueryClientProvider>
      </TonConnectUIProvider>
    </AuthProvider>
  );
};

export default AppProvider;
