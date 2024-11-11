import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Image, Tabs, Tab, Skeleton } from '@nextui-org/react';
import { MdUpdate, MdTrendingUp } from 'react-icons/md';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useInfiniteQuery } from '@tanstack/react-query';

import type { RequestToonListParams, ToonListData } from 'types/toon';

import Card from 'components/Card2';
import LayoutContainer from 'components/layout/LayoutContainer';

import { getToonList } from 'service/api/toon';

import 'swiper/css';
import 'swiper/css/pagination';

const BANNERS = [
  'https://pbs.twimg.com/media/D_Zo3S8UEAUxia-.jpg',
  'https://cdn.myportfolio.com/cf6ca8da-f458-4ed3-832e-4247757e6e7f/29ab3827-40a0-42d3-83cf-43ea25d50fbf_rw_1200.jpg?h=9684a4c09a4806a5be8ad2ee45b457a0',
  'https://static1.srcdn.com/wordpress/wp-content/uploads/2024/07/kill-the-hero-revenge-manhwa-banner.jpg',
];

const LIMIT = 9;
const ERROR_MESSAGE = 'A system error occurred. Please try again later.';

interface FetchPageResult {
  data: ToonListData;
}

const BannerSection = ({ isLoading }: { isLoading: boolean }) => (
  <div className="w-full h-48">
    {isLoading ? (
      <Skeleton className="w-full h-full" />
    ) : (
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
        {BANNERS.map((src, idx) => (
          <SwiperSlide key={src}>
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={`banner-${idx}`}
              className="w-full object-cover rounded-none"
              src={src}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    )}
  </div>
);

const Root = () => {
  const [orderBy, setOrderBy] = useState('latest');
  const observerTarget = useRef<HTMLDivElement>(null);

  const fetchPage = useCallback(
    async (pageParam: string): Promise<FetchPageResult> => {
      const data = await getToonList({
        page: pageParam ? Number(pageParam) - 1 : 0,
        limit: LIMIT,
        orderBy,
        sort: 'DESC',
      } as RequestToonListParams);

      return { data };
    },
    [orderBy],
  );

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery<FetchPageResult, Error>({
    queryKey: ['webtoon-list', orderBy],
    queryFn: ({ pageParam }) => fetchPage(pageParam as string),
    initialPageParam: '',
    getNextPageParam: (lastPage, pages) => {
      if (pages.length * LIMIT > lastPage.data.total) return undefined;
      return pages.length + 1;
    },
  });

  const items = useMemo(
    () => data?.pages.flatMap((page) => page.data.list) ?? [],
    [data?.pages],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(observerTarget.current);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <LayoutContainer isSpacing={false}>
      <div className="flex flex-col gap-4 pb-4">
        <BannerSection isLoading={isLoading} />

        <div className="flex flex-col gap-1 px-4">
          <Tabs
            aria-label="Options"
            variant="solid"
            onSelectionChange={(key) => setOrderBy(key as string)}
          >
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

          {isError ? (
            <div className="flex justify-center items-center min-h-[50vh]">
              <p>{ERROR_MESSAGE}</p>
            </div>
          ) : (
            <div className="relative z-0 grid grid-cols-3 gap-2">
              {isLoading
                ? [1, 2, 3, 4, 5, 6, 7, 8, 9].map((idx) => (
                    <div
                      key={`skeleton-${idx}`}
                      className="aspect-[1/2] w-full"
                    >
                      <Skeleton className="w-full h-full rounded-lg" />
                    </div>
                  ))
                : items.map((card) => (
                    <Card key={`card-${card.id}`} {...card} />
                  ))}
            </div>
          )}
        </div>
        <div ref={observerTarget} />
      </div>
    </LayoutContainer>
  );
};

export default Root;
