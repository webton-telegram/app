import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import { GrView } from 'react-icons/gr';
import { FaThumbsUp } from 'react-icons/fa6';

type Props = {
  img: string;
  title: string;
  writer: string;
  viewCount: string;
  likeCount: string;
};

const CustomCard = ({ img, title, writer, viewCount, likeCount }: Props) => (
  <Card
    shadow="sm"
    isPressable
    onPress={() => console.log('Go to detail page')}
  >
    <CardBody className="overflow-visible p-0">
      <Image
        shadow="sm"
        radius="lg"
        width="100%"
        alt={title}
        className="w-full object-cover"
        src={img}
      />
    </CardBody>
    <CardFooter className="flex-col items-start w-full gap-1 px-1">
      <p className="text-sm truncate w-full text-left">{title}</p>
      <p className="text-xs truncate w-full text-left text-gray-400">
        {writer}
      </p>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-1">
          <GrView className="text-gray-400" />
          <p className="text-xs text-gray-400">{viewCount}</p>
        </div>
        <div className="flex items-center gap-1">
          <FaThumbsUp className="text-gray-400" />
          <p className="text-xs text-gray-400">{likeCount}</p>
        </div>
      </div>
    </CardFooter>
  </Card>
);

export default CustomCard;
