import { useEffect } from 'react';
import WebApp from '@twa-dev/sdk';
import { useNavigate } from 'react-router-dom';

export default function useActivateBackButton(to: string) {
  const navigate = useNavigate();

  useEffect(() => {
    WebApp.BackButton.show();

    WebApp.BackButton.onClick(() => {
      navigate(to);

      WebApp.BackButton.hide();
    });

    return () => {
      WebApp.BackButton.onClick(() => {});
    };
  }, [navigate, to]);
}
