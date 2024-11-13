import { type ReactNode } from 'react';
import { cn } from 'lib/utils';

import useActivateBackButton from 'hooks/useActivateBackButton';

type Props = {
  children: ReactNode;
  isSpacing?: boolean;
};

const MainContainer = ({ children, isSpacing = true }: Props) => {
  useActivateBackButton();

  return (
    <>
      <div
        className={cn(
          'fixed top-0 bottom-0 left-0 right-0-z-10 w-full',
          'bg-white dark:bg-neutral-900',
        )}
      />
      <div className="relative flex flex-col w-full max-w-[500px] h-screen max-h-screen mx-auto lg:mx-0">
        <div
          id="main-container"
          className={cn(
            'overflow-y-auto max-h-[calc(100vh-5rem)] w-full scrollbar-hide',
            'bg-white dark:bg-neutral-900',
            'text-neutral-950 dark:text-neutral-100',
            isSpacing && 'px-4',
          )}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default MainContainer;
