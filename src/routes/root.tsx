import { Image, Tabs, Tab } from '@nextui-org/react';
import { MdUpdate, MdTrendingUp } from 'react-icons/md';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import Card from 'components/Card';
import LayoutContainer from 'components/layout/LayoutContainer';

import cards from 'data/card';

import 'swiper/css';
import 'swiper/css/pagination';

const banners = [
  'https://pbs.twimg.com/media/D_Zo3S8UEAUxia-.jpg',
  'https://cdn.myportfolio.com/cf6ca8da-f458-4ed3-832e-4247757e6e7f/29ab3827-40a0-42d3-83cf-43ea25d50fbf_rw_1200.jpg?h=9684a4c09a4806a5be8ad2ee45b457a0',
  'https://static1.srcdn.com/wordpress/wp-content/uploads/2024/07/kill-the-hero-revenge-manhwa-banner.jpg',
];

const Root = () => (
  <LayoutContainer isSpacing={false}>
    <div className="flex flex-col gap-4 pb-4">
      <div className="w-full h-[200px]">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination
          navigation
          modules={[Autoplay, Pagination, Navigation]}
          className="h-full"
        >
          {banners.map((src) => (
            <SwiperSlide>
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt="banner"
                className="w-full object-cover rounded-none"
                src={src}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex flex-col gap-1 px-4">
        <div className="flex w-full flex-col ">
          <Tabs aria-label="Options" variant="solid">
            <Tab
              key="latest"
              title={
                <div className="flex items-center space-x-2">
                  <MdUpdate />
                  <span>Latest</span>
                </div>
              }
            />
            <Tab
              key="popular"
              title={
                <div className="flex items-center space-x-2">
                  <MdTrendingUp />
                  <span>Popular</span>
                </div>
              }
            />
          </Tabs>
        </div>

        <div className="relative z-0 grid grid-cols-3 gap-2">
          {cards.map((card) => (
            <Card key={`card-${card.title}`} {...card} />
          ))}
        </div>
      </div>
    </div>
  </LayoutContainer>
);

export default Root;
