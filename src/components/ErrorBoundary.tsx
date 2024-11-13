import { Button } from '@nextui-org/react';
import { useNavigate, useRouteError } from 'react-router-dom';

const ErrorBoundary = () => {
  const error = useRouteError();

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/', { replace: true });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-12 w-full max-w-[500px] h-screen mx-auto py-16 px-6 text-black dark:text-white">
      <h2 className="text-xl">SOMETHING WENT WRONG!</h2>

      {import.meta.env.DEV && (
        <div className="w-80 h-[200px] overflow-auto p-4 rounded-lg bg-neutral-50 dark:bg-neutral-900">
          <p>{(error as Error).message}</p>
          <p>{(error as Error).stack}</p>
        </div>
      )}

      <div className="flex flex-col gap-4">
        <Button variant="light" size="lg" onClick={handleClick}>
          Back to main
        </Button>
      </div>

      <div className="flex flex-col gap-2 select-none">
        <p className="flex items-end gap-0.5 text-xl tracking-wide">WEBTON</p>
      </div>
    </div>
  );
};

export default ErrorBoundary;
