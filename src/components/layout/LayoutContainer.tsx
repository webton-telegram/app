import type { ReactNode } from 'react';
import MainContainer from 'components/layout/MainContainer';
import BottomNavigation from 'components/layout/BottomNavigation';

type Props = {
  children: ReactNode;
};

const LayoutContainer = ({ children }: Props) => (
  <div className="relative flex justify-evenly w-full mx-auto lg:max-w-[1024px] xl:max-w-[1280px] xxl:max-w[1440px]">
    <div className="flex flex-col w-full max-w-[500px]">
      <MainContainer>{children}</MainContainer>
      <BottomNavigation />
    </div>
  </div>
);

export default LayoutContainer;
