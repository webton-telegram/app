import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@nextui-org/react';

import { cn } from 'lib/utils';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleNavigate = (target: string) => () => {
    navigate(target);
  };

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 overflow-x-auto',
        'flex justify-around items-center gap-2 w-full max-w-[500px] h-16 mx-auto',
        'text-neutral-950 bg-white',
        'dark:text-neutral-100 dark:bg-neutral-900',
      )}
    >
      <Button
        variant="light"
        color="default"
        className={cn(
          'flex-col gap-1 px-1 py-2 min-w-16 h-16',
          'dark:text-neutral-200',
          /^\/$/.test(pathname) && 'text-primary dark:text-primary',
        )}
        onClick={handleNavigate('/')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          {/^\/$/.test(pathname) ? (
            <path
              fill="currentColor"
              d="M12 23a7.5 7.5 0 0 1-5.138-12.963C8.204 8.774 11.5 6.5 11 1.5c6 4 9 8 3 14c1 0 2.5 0 5-2.47c.27.773.5 1.604.5 2.47A7.5 7.5 0 0 1 12 23"
            />
          ) : (
            <path
              fill="currentColor"
              d="M12 23a7.5 7.5 0 0 0 7.5-7.5c0-.866-.23-1.697-.5-2.47q-2.5 2.47-3.8 2.47c3.995-7 1.8-10-4.2-14c.5 5-2.796 7.274-4.138 8.537A7.5 7.5 0 0 0 12 23m.71-17.765c3.241 2.75 3.257 4.887.753 9.274c-.761 1.333.202 2.991 1.737 2.991c.688 0 1.384-.2 2.119-.595a5.5 5.5 0 1 1-9.087-5.412c.126-.118.765-.685.793-.71c.424-.38.773-.717 1.118-1.086c1.23-1.318 2.114-2.78 2.566-4.462"
            />
          )}
        </svg>

        <p className="text-xs">Trending</p>
      </Button>

      <Button
        variant="light"
        color="default"
        className={cn(
          'flex-col gap-1 px-1 py-2 min-w-16 h-16',
          'dark:text-neutral-200',
          /^\/reward/.test(pathname) && 'text-primary dark:text-primary',
        )}
        onClick={handleNavigate('/reward')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          {/^\/reward/.test(pathname) ? (
            <path
              fill="currentColor"
              d="M2 21V9h5.5v12zm7.25 0V3h5.5v18zm7.25 0V11H22v10z"
            />
          ) : (
            <path
              fill="currentColor"
              d="M4 19h4v-8H4zm6 0h4V5h-4zm6 0h4v-6h-4zM2 21V9h6V3h8v8h6v10z"
            />
          )}
        </svg>

        <p className="text-xs">Reward</p>
      </Button>

      <Button
        variant="light"
        color="default"
        className={cn(
          'flex-col gap-1 px-1 py-2 min-w-16 h-16',
          'dark:text-neutral-200',
          /^\/query/.test(pathname) && 'text-primary dark:text-primary',
        )}
        onClick={handleNavigate('/query')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill={/^\/query/.test(pathname) ? '#5aa0d4' : 'currentColor'}
            d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"
          />
        </svg>

        <p className="text-xs">Search</p>
      </Button>

      <Button
        variant="light"
        color="default"
        className={cn(
          'flex-col gap-1 px-1 py-2 min-w-16 h-16',
          'dark:text-neutral-200',
          /^\/mission/.test(pathname) && 'text-primary dark:text-primary',
        )}
        onClick={handleNavigate('/mission')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          {/^\/mission/.test(pathname) ? (
            <path
              fill="currentColor"
              d="M9.06 1.93C7.17 1.92 5.33 3.74 6.17 6H3a2 2 0 0 0-2 2v2a1 1 0 0 0 1 1h9V8h2v3h9a1 1 0 0 0 1-1V8a2 2 0 0 0-2-2h-3.17C19 2.73 14.6.42 12.57 3.24L12 4l-.57-.78c-.63-.89-1.5-1.28-2.37-1.29M9 4c.89 0 1.34 1.08.71 1.71S8 5.89 8 5a1 1 0 0 1 1-1m6 0c.89 0 1.34 1.08.71 1.71S14 5.89 14 5a1 1 0 0 1 1-1M2 12v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8h-9v8h-2v-8z"
            />
          ) : (
            <path
              fill="currentColor"
              d="M22 12v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a1 1 0 0 1-1-1V8a2 2 0 0 1 2-2h3.17A3 3 0 0 1 6 5a3 3 0 0 1 3-3c1 0 1.88.5 2.43 1.24v-.01L12 4l.57-.77v.01C13.12 2.5 14 2 15 2a3 3 0 0 1 3 3a3 3 0 0 1-.17 1H21a2 2 0 0 1 2 2v3a1 1 0 0 1-1 1M4 20h7v-8H4zm16 0v-8h-7v8zM9 4a1 1 0 0 0-1 1a1 1 0 0 0 1 1a1 1 0 0 0 1-1a1 1 0 0 0-1-1m6 0a1 1 0 0 0-1 1a1 1 0 0 0 1 1a1 1 0 0 0 1-1a1 1 0 0 0-1-1M3 8v2h8V8zm10 0v2h8V8z"
            />
          )}
        </svg>

        <p className="text-xs">Mission</p>
      </Button>

      <Button
        variant="light"
        color="default"
        className={cn(
          'flex-col gap-1 px-1 py-2 min-w-16 h-16',
          'dark:text-neutral-200',
          /^\/profile/.test(pathname) && 'text-primary dark:text-primary',
        )}
        onClick={handleNavigate('/profile')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          {/^\/profile/.test(pathname) ? (
            <path
              fill="currentColor"
              d="M7.39 16.539a8 8 0 1 1 9.221 0l2.083 4.76a.5.5 0 0 1-.459.701H5.765a.5.5 0 0 1-.459-.7zm.729-5.569a4.002 4.002 0 0 0 7.763 0l-1.941-.485a2 2 0 0 1-3.882 0z"
            />
          ) : (
            <path
              fill="currentColor"
              d="M7.39 16.539a8 8 0 1 1 9.221 0l2.083 4.76a.5.5 0 0 1-.459.701H5.765a.5.5 0 0 1-.459-.7zm6.735-.693l1.332-.941a6 6 0 1 0-6.913 0l1.331.941L8.058 20h7.884zM8.119 10.97l1.94-.485a2 2 0 0 0 3.882 0l1.94.485a4.002 4.002 0 0 1-7.762 0"
            />
          )}
        </svg>

        <p className="text-xs">Profile</p>
      </Button>
    </div>
  );
};

export default BottomNavigation;
