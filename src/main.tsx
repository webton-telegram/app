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

import './index.css';

WebApp.ready();

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
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>,
);
