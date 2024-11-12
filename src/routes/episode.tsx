import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Image, Skeleton } from '@nextui-org/react';
import { GrView } from 'react-icons/gr';
import { FaThumbsUp, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { FaArrowRightArrowLeft } from 'react-icons/fa6';
import { useInfiniteQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

import type { RequestEpisodeListParams, EpisodeListData } from 'types/episode';

import LayoutContainer from 'components/layout/LayoutContainer';

import { cn, formatCompactNumber } from 'lib/utils';
import { getEpisodeList } from 'service/api/episode';

interface FetchPageResult {
  data: EpisodeListData;
}

const LIMIT = 20;
const ERROR_MESSAGE = 'A system error occurred. Please try again later.';

const Episode = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isExpanded, setIsExpanded] = useState(false);

  const observerTarget = useRef<HTMLDivElement>(null);

  const fetchPage = useCallback(
    async (pageParam: string): Promise<FetchPageResult> => {
      const data = await getEpisodeList({
        page: pageParam ? Number(pageParam) - 1 : 0,
        limit: LIMIT,
        toonId: Number(id),
      } as RequestEpisodeListParams);

      return { data };
    },
    [id],
  );

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery<FetchPageResult, Error>({
    queryKey: ['episode-list', id],
    queryFn: ({ pageParam }) => fetchPage(pageParam as string),
    initialPageParam: '',
    getNextPageParam: (lastPage, pages) => {
      if (pages.length * LIMIT > lastPage.data.total) return undefined;
      return pages.length + 1;
    },
    enabled: !!id,
  });

  const items = useMemo(
    () => data?.pages.flatMap((page) => page.data.list) ?? [],
    [data?.pages],
  );

  const handleClick = (detailId: number) => () => {
    navigate(`/detail/${detailId}`);
  };

  const handleWriterClick = (writerId: number) => () => {
    navigate(`/writer/${writerId}`);
  };

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

  useEffect(() => {
    if (!id) navigate('/');
  }, [id, navigate]);

  if (!id) return null;

  if (isError) {
    return (
      <LayoutContainer isSpacing={false}>
        <div className="flex justify-center items-center min-h-[90vh]">
          <p>{ERROR_MESSAGE}</p>
        </div>
      </LayoutContainer>
    );
  }

  return (
    <LayoutContainer isSpacing={false}>
      <div className="space-y-6">
        <div className="flex items-center justify-center w-full h-auto max-h-80 overflow-hidden">
          {isLoading ? (
            <Skeleton className="w-screen h-64" />
          ) : (
            <Image
              shadow="sm"
              width="100%"
              alt="banner"
              className="w-full object-cover rounded-none"
              src="https://pbs.twimg.com/media/D_Zo3S8UEAUxia-.jpg"
            />
          )}
        </div>

        <div className="px-4 space-y-4 text-center">
          {isLoading ? (
            <div className="flex flex-col justify-center items-center gap-2">
              <Skeleton className="w-48 h-7 rounded-lg" />
              <Skeleton className="w-32 h-5 rounded-lg" />
            </div>
          ) : (
            <div>
              <h2 className="text-lg font-semibold">Gourmet Hound</h2>
              <Button
                className="min-w-0 h-auto p-0"
                variant="light"
                onClick={handleWriterClick(1)}
              >
                <p className="text-sm text-gray-400 font-bold">leehama</p>
              </Button>
            </div>
          )}

          {isLoading ? (
            <div className="flex flex-col justify-center items-center gap-1">
              <Skeleton className="w-11/12 h-5 rounded-lg" />
              <Skeleton className="w-full h-5 rounded-lg" />
            </div>
          ) : (
            <div
              className={cn(
                'flex',
                isExpanded ? 'items-start' : 'items-center justify-between',
              )}
            >
              <p
                className={cn(
                  'text-sm text-gray-500',
                  isExpanded ? '' : 'line-clamp-1',
                )}
              >
                Lucy, a woman with an uncanny sense of taste and smell,
                discovers that her favorite restaurant has changed kitchen
                staff--and she does not know the identity of the chef whose
                cooking she&apos;s loved for years. When a lucky accident leads
                her to two former chefs at Dimanche, she decides that she will
                do her utmost to track down each of their old colleagues in
                order to rediscover that &quot;perfect taste&quot;.
              </p>
              <Button
                className="min-w-6 h-6 !px-0 bg-transparent"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
              </Button>
            </div>
          )}

          <div className="flex items-center justify-center gap-4">
            {isLoading ? (
              <>
                <Skeleton className="w-11 h-4 rounded-lg" />
                <Skeleton className="w-11 h-4 rounded-lg" />
              </>
            ) : (
              <>
                <div className="flex items-center gap-1 text-gray-400">
                  <GrView className="text-gray-400" />
                  <span className="text-xs">
                    {formatCompactNumber.format(17293200)}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                  <FaThumbsUp className="text-gray-400" />
                  <span className="text-xs">
                    {formatCompactNumber.format(6293200)}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="px-4 pb-10">
          {isLoading ? (
            <Skeleton className="w-20 h-5 rounded-lg" />
          ) : (
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">119 episodes</p>
              <figure className="rotate-90">
                <FaArrowRightArrowLeft />
              </figure>
            </div>
          )}

          {isLoading ? (
            <div className="mt-2 space-y-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                <button key={item} className="w-full p-0 text-left">
                  <Card className="flex-row items-center p-2 gap-2 bg-content1">
                    <Skeleton className="w-full max-w-16 h-10 rounded-lg" />
                    <div className="flex-1 flex flex-col gap-1">
                      <Skeleton className="w-20 h-5 rounded-lg" />
                      <Skeleton className="w-8/12 h-5 rounded-lg" />
                      <div className="flex items-center gap-4 mt-1 text-gray-400">
                        <Skeleton className="w-24 h-4 rounded-lg" />
                        <Skeleton className="w-10 h-4 rounded-lg" />
                        <Skeleton className="w-10 h-4 rounded-lg" />
                      </div>
                    </div>
                  </Card>
                </button>
              ))}
            </div>
          ) : (
            <div className="mt-2 space-y-2">
              {items.map((episode) => (
                <button
                  key={episode.id}
                  className="w-full p-0 text-left"
                  onClick={handleClick(episode.id)}
                >
                  <Card className="flex-row items-center p-2 gap-2 bg-content1">
                    <div className="bg-gray-500 w-16">
                      <Image
                        shadow="sm"
                        width="100%"
                        alt="banner"
                        className="w-full object-cover rounded-none"
                        src={episode.thumbnailUrl}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-400">
                        Episode {episode.episodeNumber}
                      </p>
                      <p className="text-md font-medium">{episode.title}</p>

                      <div className="flex items-center gap-4 mt-1 text-gray-400">
                        <p className="text-xs text-gray-400">
                          {format(
                            new Date(episode.createdAt),
                            'MM/dd/yyyy HH:mm',
                          )}
                        </p>
                        <div className="flex items-center gap-1">
                          <GrView className="text-gray-400" />
                          <span className="text-xs">{episode.viewCount}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaThumbsUp className="text-gray-400" size={14} />
                          <p className="text-xs">{episode.likeCount}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </LayoutContainer>
  );
};

export default Episode;
