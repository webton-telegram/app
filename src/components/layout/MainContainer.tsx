import { type ReactNode } from 'react';
import { cn } from 'lib/utils';

type Props = {
  children: ReactNode;
};

const MainContainer = ({ children }: Props) => (
  <>
    <div
      className={cn(
        'fixed top-0 bottom-0 left-0 right-0-z-10 w-full',
        'bg-white dark:bg-neutral-900',
      )}
    />
    <div className="relative flex flex-col w-full max-w-[500px] h-screen max-h-screen mx-auto lg:mx-0">
      <div
        className={cn(
          'overflow-y-auto max-h-[calc(100vh-4rem)] px-4',
          'bg-white dark:bg-neutral-900',
          'text-neutral-950 dark:text-neutral-100',
        )}
      >
        {children}
      </div>
    </div>
  </>
);

export default MainContainer;
