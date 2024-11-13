import { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';
import { useNavigate, useLocation } from 'react-router-dom';

type Path = '/episode' | '/detail' | '/recently' | '/recommended';

const showBackButtonPaths: Path[] = [
  '/episode',
  '/detail',
  '/recently',
  '/recommended',
];

const navigationPaths: Record<Path, string | number> = {
  '/episode': -1,
  '/detail': -1,
  '/recently': '/profile',
  '/recommended': '/profile',
};

export default function useActivateBackButton() {
  const [currentPath, setCurrentPath] = useState<Path | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const matchedPath = showBackButtonPaths.find((path) =>
      location.pathname.includes(path),
    );

    if (matchedPath) {
      WebApp.BackButton.show();
      setCurrentPath(matchedPath);
    } else {
      WebApp.BackButton.hide();
      setCurrentPath(null);
    }
  }, [location]);

  useEffect(() => {
    if (!currentPath || navigationPaths[currentPath]) return;

    const to = navigationPaths[currentPath];

    WebApp.BackButton.onClick(() => {
      if (typeof to === 'string') {
        navigate(to);
      } else if (typeof to === 'number') {
        navigate(to);
      }
    });
  }, [navigate, currentPath]);

  return currentPath;
}
