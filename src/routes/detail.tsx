import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GrView } from 'react-icons/gr';
import { FaThumbsUp, FaShareAlt } from 'react-icons/fa';
import { AiOutlineLike } from 'react-icons/ai';
import { Button, Image } from '@nextui-org/react';

import LayoutContainer from 'components/layout/LayoutContainer';

import { formatCompactNumber } from 'lib/utils';
import detailImages from 'data/detail';

const Detail = () => {
  const [showButtons, setShowButtons] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { id } = useParams();
  const navigate = useNavigate();

  const controlButtons = useCallback(
    (event: Event) => {
      const target = event.currentTarget as HTMLElement;
      const currentScrollY = target.scrollTop;

      if (currentScrollY > lastScrollY) {
        setShowButtons(false);
      } else {
        setShowButtons(true);
      }
      setLastScrollY(currentScrollY);
    },
    [lastScrollY],
  );

  useEffect(() => {
    const mainContainer = document.getElementById('main-container');

    mainContainer?.addEventListener('scroll', controlButtons);

    return () => {
      mainContainer?.removeEventListener('scroll', controlButtons);
    };
  }, [controlButtons]);

  useEffect(() => {
    if (!id) navigate('/');
  }, [id, navigate]);

  if (!id) return null;

  return (
    <LayoutContainer isSpacing={false}>
      <div className="space-y-2 p-4">
        <h2 className="text-lg font-semibold">1 - Chopped Onions</h2>
        <div className="flex gap-2">
          <p className="text-sm text-gray-600">leehama</p>
          <p className="text-sm text-gray-600">2024-08-30 00:00</p>
        </div>
        <div className="flex items-center gap-4">
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
      <div>
        {detailImages.map((image, idx) => (
          <Image
            shadow="none"
            width="100%"
            alt={`image-${idx}`}
            className="w-full object-cover rounded-none"
            src={image}
          />
        ))}
      </div>
      <div
        className={`fixed z-10 bottom-[88px] left-3 flex items-center justify-between w-[calc(100%-24px)] gap-1 transition-opacity duration-300 ${
          showButtons ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
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
    </LayoutContainer>
  );
};

export default Detail;
