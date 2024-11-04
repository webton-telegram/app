import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';

import AppProvider from 'components/AppProvider';
import Root from 'routes/root';
import Reward from 'routes/reward';
import Query from 'routes/query';
import Mission from 'routes/mission';
import Profile from 'routes/profile';
import Recently from 'routes/recently';
import Recommended from 'routes/recommended';
import Episode from 'routes/episode';
import Detail from 'routes/detail';
import Writer from 'routes/writer';

import './index.css';

WebApp.ready();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [],
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
  {
    path: '/episode/:id',
    element: <Episode />,
  },
  {
    path: '/detail/:id',
    element: <Detail />,
  },
  {
    path: '/writer/:id',
    element: <Writer />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>,
);
