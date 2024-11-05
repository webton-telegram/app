import { type ReactNode, useEffect } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import WebApp from '@twa-dev/sdk';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthUpdater from './AuthUpdater';

type Props = {
  children: ReactNode;
};

const queryClient = new QueryClient();

const AppProvider = ({ children }: Props) => {
  useEffect(() => {
    WebApp.expand();
  }, []);

  return (
    <TonConnectUIProvider
      manifestUrl={`${import.meta.env.VITE_HOST}/tonconnect-manifest.json`}
    >
      <QueryClientProvider client={queryClient}>
        <NextUIProvider>
          <NextThemesProvider attribute="class">
            {children}
            <AuthUpdater />
          </NextThemesProvider>
        </NextUIProvider>
      </QueryClientProvider>
    </TonConnectUIProvider>
  );
};

export default AppProvider;
