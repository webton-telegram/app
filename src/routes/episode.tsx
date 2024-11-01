import { useParams } from 'react-router-dom';

import LayoutContainer from 'components/layout/LayoutContainer';

const Episode = () => {
  const { id } = useParams();

  return (
    <LayoutContainer>
      <div className="py-4 space-y-4">
        <h1>Episode {id}</h1>
      </div>
    </LayoutContainer>
  );
};

export default Episode;
