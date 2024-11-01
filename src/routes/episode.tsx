import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Image } from '@nextui-org/react';
import { GrView } from 'react-icons/gr';
import { FaThumbsUp, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { FaArrowRightArrowLeft } from 'react-icons/fa6';

import LayoutContainer from 'components/layout/LayoutContainer';

import episodeList from 'data/episode';
import { cn, formatCompactNumber } from 'lib/utils';

const Episode = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!id) navigate('/');
  }, [id, navigate]);

  if (!id) return null;

  return (
    <LayoutContainer isSpacing={false}>
      <div className="space-y-6">
        <div className="flex items-center justify-center w-full h-auto max-h-80 overflow-hidden">
          <Image
            shadow="sm"
            width="100%"
            alt="banner"
            className="w-full object-cover rounded-none"
            src="https://pbs.twimg.com/media/D_Zo3S8UEAUxia-.jpg"
          />
        </div>

        <div className="px-4 space-y-4 text-center">
          <div>
            <h2 className="text-lg font-semibold">Gourmet Hound</h2>
            <p className="text-sm text-gray-400">leehama</p>
          </div>
          <div
            className={cn(
              'flex',
              isExpanded ? 'items-start' : 'items-center justify-between',
            )}
          >
            <p
              className={cn(
                'text-sm text-gray-600',
                isExpanded ? '' : 'line-clamp-1',
              )}
            >
              Lucy, a woman with an uncanny sense of taste and smell, discovers
              that her favorite restaurant has changed kitchen staff--and she
              does not know the identity of the chef whose cooking she&apos;s
              loved for years. When a lucky accident leads her to two former
              chefs at Dimanche, she decides that she will do her utmost to
              track down each of their old colleagues in order to rediscover
              that &quot;perfect taste&quot;.
            </p>
            <Button
              className="min-w-6 h-6 !px-0 bg-transparent"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
            </Button>
          </div>
          <div className="flex items-center justify-center gap-4">
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
          </div>
        </div>

        <div className="px-4 pb-10">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">119 episodes</p>
            <figure className="rotate-90">
              <FaArrowRightArrowLeft />
            </figure>
          </div>
          <div className="mt-2 space-y-2">
            {episodeList.map((episode) => (
              <Card
                key={episode.episode}
                className="flex-row items-center p-2 gap-2 bg-content1"
              >
                <div className="bg-gray-500 w-16">
                  <Image
                    shadow="sm"
                    width="100%"
                    alt="banner"
                    className="w-full object-cover rounded-none"
                    src={episode.img}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-400">
                    Episode {episode.episode}
                  </p>
                  <p className="text-md font-medium">{episode.title}</p>

                  <div className="flex items-center gap-4 mt-1 text-gray-400">
                    <p className="text-xs text-gray-400">{episode.date}</p>
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
            ))}
          </div>
        </div>
      </div>
    </LayoutContainer>
  );
};

export default Episode;
