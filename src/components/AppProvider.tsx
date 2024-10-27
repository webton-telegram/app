import { ReactNode, useEffect } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import WebApp from '@twa-dev/sdk';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

type Props = {
  children: ReactNode;
};

const AppProvider = ({ children }: Props) => {
  useEffect(() => {
    WebApp.expand();
  }, []);

  return (
    <TonConnectUIProvider
      manifestUrl={`${import.meta.env.VITE_HOST}/tonconnect-manifest.json`}
    >
      <NextUIProvider>
        <NextThemesProvider attribute="class">{children}</NextThemesProvider>
      </NextUIProvider>
    </TonConnectUIProvider>
  );
};

export default AppProvider;
