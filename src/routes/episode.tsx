import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Image, Skeleton } from '@nextui-org/react';
import { GrView } from 'react-icons/gr';
import { FaThumbsUp, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { FaArrowRightArrowLeft } from 'react-icons/fa6';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

import type { RequestEpisodeListParams, EpisodeListData } from 'types/episode';

import LayoutContainer from 'components/layout/LayoutContainer';

import { cn, formatCompactNumber } from 'lib/utils';
import { getEpisodeList } from 'service/api/episode';
import { getToonDetail } from 'service/api/toon';

interface FetchPageResult {
  data: EpisodeListData;
}

const LIMIT = 20;
const ERROR_MESSAGE = 'A system error occurred. Please try again later.';

const Episode = () => {
  const { toonId } = useParams();
  const navigate = useNavigate();

  const [isExpanded, setIsExpanded] = useState(false);
  const [sort, setSort] = useState<'DESC' | 'ASC'>('DESC');
  const [total, setTotal] = useState(0);

  const observerTarget = useRef<HTMLDivElement>(null);

  const fetchToonDetail = async () => {
    const data = await getToonDetail(Number(toonId));
    return { data };
  };

  const {
    isLoading: toonIsLoading,
    isError: toonIsError,
    data: toonDetailData,
  } = useQuery({
    queryKey: ['toon-info', toonId],
    queryFn: fetchToonDetail,
    enabled: !!toonId,
  });

  const fetchPage = useCallback(
    async (pageParam: string): Promise<FetchPageResult> => {
      const data = await getEpisodeList({
        page: pageParam ? Number(pageParam) - 1 : 0,
        limit: LIMIT,
        toonId: Number(toonId),
        sort,
      } as RequestEpisodeListParams);

      setTotal(data.total);

      return { data };
    },
    [toonId, sort],
  );

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery<FetchPageResult, Error>({
    queryKey: ['episode-list', toonId, sort],
    queryFn: ({ pageParam }) => fetchPage(pageParam as string),
    initialPageParam: '',
    getNextPageParam: (lastPage, pages) => {
      if (pages.length * LIMIT > lastPage.data.total) return undefined;
      return pages.length + 1;
    },
    enabled: !!toonId,
  });

  const items = useMemo(
    () => data?.pages.flatMap((page) => page.data.list) ?? [],
    [data?.pages],
  );

  const handleClick = (episodeId: number) => () => {
    navigate(`/detail/${toonId}/${episodeId}`);
  };

  const handleWriterClick = () => {
    if (items.length === 0) return;
    const writerId = items[0].author.id;
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
    if (!toonId) navigate('/');
  }, [toonId, navigate]);

  if (!toonId) return null;

  if (isError || toonIsError) {
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
        <div className="relative w-full h-auto max-h-60 overflow-hidden flex items-center justify-center">
          {toonIsLoading ? (
            <Skeleton className="w-screen h-64" />
          ) : (
            <>
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center blur-md"
                style={{
                  backgroundImage: `url(${toonDetailData?.data.thumbnailUrl})`,
                }}
              />
              <Image
                shadow="sm"
                width="100%"
                alt="banner"
                className="relative z-10 w-auto h-auto max-h-80 object-contain"
                src={toonDetailData?.data.thumbnailUrl}
              />
            </>
          )}
        </div>

        <div className="px-4 space-y-4 text-center">
          {toonIsLoading ? (
            <div className="flex flex-col justify-center items-center gap-2">
              <Skeleton className="w-48 h-7 rounded-lg" />
              <Skeleton className="w-32 h-5 rounded-lg" />
            </div>
          ) : (
            <div>
              <h2 className="text-lg font-semibold">
                {toonDetailData?.data.title}
              </h2>
              <Button
                className="min-w-0 h-auto p-0"
                variant="light"
                onClick={handleWriterClick}
              >
                <p className="text-sm text-gray-400 font-bold">
                  {toonDetailData?.data.author.firstName}{' '}
                  {toonDetailData?.data.author.lastName}
                </p>
              </Button>
            </div>
          )}

          {toonIsLoading ? (
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
                {toonDetailData?.data.description}
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
            {toonIsLoading ? (
              <>
                <Skeleton className="w-11 h-4 rounded-lg" />
                <Skeleton className="w-11 h-4 rounded-lg" />
              </>
            ) : (
              <>
                <div className="flex items-center gap-1 text-gray-400">
                  <GrView className="text-gray-400" />
                  <span className="text-xs">
                    {formatCompactNumber.format(
                      toonDetailData?.data.viewCount || 0,
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                  <FaThumbsUp className="text-gray-400" />
                  <span className="text-xs">
                    {formatCompactNumber.format(
                      toonDetailData?.data.likeCount || 0,
                    )}
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
              <p className="text-sm font-semibold">{total} episodes</p>
              <Button
                className="rotate-90 !w-auto !min-w-0 !h-auto !min-h-0 !px-0 !py-0"
                onClick={() => setSort(sort === 'DESC' ? 'ASC' : 'DESC')}
              >
                <FaArrowRightArrowLeft />
              </Button>
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
                          <span className="text-xs">
                            {formatCompactNumber.format(episode.viewCount)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaThumbsUp className="text-gray-400" size={14} />
                          <span className="text-xs">
                            {formatCompactNumber.format(episode.likeCount)}
                          </span>
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
