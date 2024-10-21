import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';
import { init } from '@telegram-apps/sdk';

import AppProvider from 'components/AppProvider';
import Root from 'routes/root';
import Reward from 'routes/reward';
import Query from 'routes/query';
import Mission from 'routes/mission';
import Profile from 'routes/profile';
import Recently from 'routes/recently';
import Recommended from 'routes/recommended';

import './index.css';

WebApp.ready();

if (window.Telegram.WebApp.initData) {
  init();
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: '/reward',
    element: <Reward />,
  },
  {
    path: '/query',
    element: <Query />,
  },
  {
    path: '/mission',
    element: <Mission />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/profile/recently',
    element: <Recently />,
  },
  {
    path: '/profile/recommended',
    element: <Recommended />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>,
);
