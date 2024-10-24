import { ReactNode, useEffect } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import WebApp from '@twa-dev/sdk';

type Props = {
  children: ReactNode;
};

const AppProvider = ({ children }: Props) => {
  useEffect(() => {
    WebApp.expand();
  }, []);

  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class">{children}</NextThemesProvider>
    </NextUIProvider>
  );
};

export default AppProvider;
