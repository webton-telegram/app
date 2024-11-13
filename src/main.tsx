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
import ErrorBoundary from 'components/ErrorBoundary';

WebApp.ready();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [],
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/reward',
    element: <Reward />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/query',
    element: <Query />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/mission',
    element: <Mission />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/profile',
    element: <Profile />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/profile/recently',
    element: <Recently />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/profile/recommended',
    element: <Recommended />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/episode/:toonId',
    element: <Episode />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/detail/:toonId/:episodeId',
    element: <Detail />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/writer/:id',
    element: <Writer />,
    errorElement: <ErrorBoundary />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>,
);
