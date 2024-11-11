import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import { GrView } from 'react-icons/gr';
import { FaThumbsUp } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

import type { ToonItem } from 'types/toon';

import { formatCompactNumber } from 'lib/utils';

const CustomCard = ({
  id,
  viewCount,
  likeCount,
  title,
  thumbnailUrl,
  author,
}: ToonItem) => {
  const navigate = useNavigate();

  const handlePress = () => {
    navigate(`/episode/${id}`);
  };

  return (
    <Card shadow="sm" isPressable onPress={handlePress}>
      <CardBody className="overflow-visible p-0">
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          alt={title}
          className="w-full object-cover"
          src={thumbnailUrl}
        />
      </CardBody>
      <CardFooter className="flex-col items-start w-full gap-1 px-1">
        <p className="text-sm truncate w-full text-left">{title}</p>
        <p className="text-xs truncate w-full text-left text-gray-400">
          {author.firstName} {author.lastName}
        </p>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-1">
            <GrView className="text-gray-400" />
            <p className="text-xs text-gray-400">
              {formatCompactNumber.format(viewCount)}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <FaThumbsUp className="text-gray-400" size={14} />
            <p className="text-xs text-gray-400">
              {formatCompactNumber.format(likeCount)}
            </p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CustomCard;
