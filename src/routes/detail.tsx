import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import LayoutContainer from 'components/layout/LayoutContainer';

const Episode = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) navigate('/');
  }, [id, navigate]);

  if (!id) return null;

  return <LayoutContainer isSpacing={false}>Detail</LayoutContainer>;
};

export default Episode;
