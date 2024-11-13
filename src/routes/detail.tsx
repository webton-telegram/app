import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GrView } from 'react-icons/gr';
import {
  FaThumbsUp,
  FaShareAlt,
  FaArrowRight,
  FaArrowLeft,
} from 'react-icons/fa';
import { AiOutlineLike } from 'react-icons/ai';
import { Button, Image, Skeleton } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import WebApp from '@twa-dev/sdk';

import LayoutContainer from 'components/layout/LayoutContainer';

import { cn, formatCompactNumber } from 'lib/utils';
import { getEpisode } from 'service/api/episode';

const ERROR_MESSAGE = 'A system error occurred. Please try again later.';

const Detail = () => {
  const [isScrollEnded, setIsScrollEnded] = useState(false);
  const [showEpisodeScrollUp, setShowEpisodeScrollUp] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { toonId, episodeId } = useParams();
  const navigate = useNavigate();
  const observerRef = useRef<HTMLDivElement>(null);

  const fetchEpisode = async () => {
    const data = await getEpisode(Number(episodeId));
    return { data };
  };

  const { isLoading, isError, data } = useQuery({
    queryKey: ['episode-detail', episodeId],
    queryFn: fetchEpisode,
    enabled: !!episodeId,
  });

  const controlButtons = useCallback(
    (event: Event) => {
      const target = event.currentTarget as HTMLElement;
      const currentScrollY = target.scrollTop;

      if (currentScrollY > lastScrollY) {
        setShowEpisodeScrollUp(false);
      } else {
        setShowEpisodeScrollUp(true);
      }
      setLastScrollY(currentScrollY);
    },
    [lastScrollY],
  );

  const handleWriterClick = () => () => {
    if (!data?.data.episode.author.id) return;
    const writerId = data?.data.episode.author.id;
    navigate(`/writer/${writerId}`);
  };

  const handleEpisodeMoveClick = (id?: number) => () => {
    if (!id) return;
    navigate(`/detail/${toonId}/${id}`);
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setIsScrollEnded(!!entry.isIntersecting);
      });
    }, options);

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
  }, []);

  useEffect(() => {
    const mainContainer = document.getElementById('main-container');

    mainContainer?.addEventListener('scroll', controlButtons);

    return () => {
      mainContainer?.removeEventListener('scroll', controlButtons);
    };
  }, [controlButtons]);

  useEffect(() => {
    if (!episodeId || !WebApp.initData) navigate('/');
  }, [episodeId, navigate]);

  if (!episodeId) return null;

  if (isError || !data) {
    <LayoutContainer isSpacing={false}>
      <div className="flex justify-center items-center min-h-[90vh]">
        <p>{ERROR_MESSAGE}</p>
      </div>
    </LayoutContainer>;
  }

  return (
    <LayoutContainer isSpacing={false}>
      <div className="space-y-2 p-4">
        {isLoading ? (
          <Skeleton className="w-full h-7 rounded-lg" />
        ) : (
          <h2 className="text-lg font-semibold">{data?.data.episode.title}</h2>
        )}
        <div className="flex gap-2">
          {isLoading ? (
            <>
              <Skeleton className="w-14 h-5 rounded-lg" />
              <Skeleton className="w-32 h-5 rounded-lg" />
            </>
          ) : (
            <>
              <Button
                className="min-w-0 h-auto p-0"
                variant="light"
                onClick={handleWriterClick}
              >
                <p className="text-sm text-gray-400 font-bold">
                  {data?.data.episode.author.firstName}{' '}
                  {data?.data.episode.author.lastName}
                </p>
              </Button>
              {data?.data.episode.createdAt && (
                <p className="text-sm text-gray-400">
                  {format(
                    new Date(data.data.episode.createdAt),
                    'MM/dd/yyyy HH:mm',
                  )}
                </p>
              )}
            </>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-gray-400">
            {isLoading ? (
              <Skeleton className="w-10 h-5 rounded-lg" />
            ) : (
              <>
                <GrView className="text-gray-400" />
                <span className="text-xs">
                  {formatCompactNumber.format(
                    data?.data.episode.viewCount || 0,
                  )}
                </span>
              </>
            )}
          </div>
          <div className="flex items-center gap-1 text-gray-400">
            {isLoading ? (
              <Skeleton className="w-10 h-5 rounded-lg" />
            ) : (
              <>
                <FaThumbsUp className="text-gray-400" />
                <span className="text-xs">
                  {formatCompactNumber.format(
                    data?.data.episode.likeCount || 0,
                  )}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <div>
        {isLoading ? (
          <Skeleton className="w-full h-screen rounded-lg" />
        ) : (
          <Image
            shadow="none"
            width="100%"
            alt="episode"
            className="w-full object-cover rounded-none"
            src={data?.data.url || ''}
          />
        )}
      </div>
      <div ref={observerRef} className="h-1 mb-10" />

      <div
        className={cn(
          'fixed z-10 bottom-[168px] left-3 flex items-center justify-between w-[calc(100%-24px)] gap-2 transition-opacity duration-300',
          isScrollEnded ? 'opacity-100' : 'opacity-0 pointer-events-none',
        )}
      >
        <Button className="flex-1" color="primary" variant="faded">
          <AiOutlineLike />
          Recommend
        </Button>
        <Button className="flex-1" color="success" variant="faded">
          <FaShareAlt />
          Share
        </Button>
      </div>
      <div
        className={`fixed z-10 bottom-20 flex items-center justify-between w-full transition-opacity duration-300 ${
          isScrollEnded || showEpisodeScrollUp
            ? 'opacity-100'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center justify-between w-full p-4 bg-neutral-800">
          <Button
            className={cn(
              'min-w-0',
              !data?.data.prevEpisode?.id && 'opacity-30',
            )}
            disabled={!data?.data.prevEpisode?.id}
            onClick={handleEpisodeMoveClick(data?.data.prevEpisode?.id)}
          >
            <FaArrowLeft />
          </Button>
          <Button onClick={() => navigate(`/episode/${toonId}`)}>
            Episode List
          </Button>
          <Button
            className={cn(
              'min-w-0',
              !data?.data.nextEpisode?.id && 'opacity-30',
            )}
            disabled={!data?.data.nextEpisode?.id}
            onClick={handleEpisodeMoveClick(data?.data.nextEpisode?.id)}
          >
            <FaArrowRight />
          </Button>
        </div>
      </div>
    </LayoutContainer>
  );
};

export default Detail;
