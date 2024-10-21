import { type ReactNode } from 'react';
import { cn } from 'lib/utils';

type Props = {
  children: ReactNode;
};

const MainContainer = ({ children }: Props) => (
  <>
    <div
      className={cn(
        'fixed top-0 bottom-0 left-0 right-0-z-10',
        'bg-white dark:bg-neutral-900',
      )}
    />
    <div className="relative flex flex-col w-full max-w-[500px] mx-auto lg:mx-0">
      <div
        className={cn(
          'min-h-[calc(100vh-4rem)] p-5',
          'bg-white dark:bg-neutral-900',
          'text-neutral-950 dark:text-white',
        )}
      >
        {children}
      </div>
    </div>
  </>
);

export default MainContainer;
