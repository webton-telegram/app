import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Card from 'components/Card';
import LayoutContainer from 'components/layout/LayoutContainer';

import cards from 'data/card';
import { setComma } from 'lib/utils';

const Query = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) navigate('/');
  }, [id, navigate]);

  return (
    <LayoutContainer>
      <div className="flex flex-col gap-3 py-4">
        <div className="flex items-center gap-1">
          <p className="text-lg">
            Works by <span className="font-bold text-primary">leehama</span>,
          </p>
          <p className="text-md text-gray-400">total {setComma(9)}</p>
        </div>
        <div className="relative z-0 grid grid-cols-3 gap-2 pb-4">
          {cards.slice(0, 9).map((card) => (
            <Card key={`recommend-${card.title}`} {...card} writer="leehama" />
          ))}
        </div>
      </div>
    </LayoutContainer>
  );
};

export default Query;
