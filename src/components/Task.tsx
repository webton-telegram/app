import { useMemo } from 'react';
import { Button, Progress } from '@nextui-org/react';
import { IoIosArrowBack } from 'react-icons/io';
import { GoCheck } from 'react-icons/go';

export type Props = {
  title: string;
  point: number;
  currentMissionCount: number;
  maxMissionCount: number;
  status: 'ongoing' | 'completed';
};

const Task = ({
  title,
  point,
  currentMissionCount,
  maxMissionCount,
  status,
}: Props) => {
  const progress = useMemo(
    () =>
      maxMissionCount === 0
        ? 0
        : Math.round((currentMissionCount / maxMissionCount) * 100),
    [currentMissionCount, maxMissionCount],
  );

  return (
    <div className="flex justify-between items-center p-3 rounded-lg shadow-sm bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col w-full gap-1">
        <p className="font-medium">{title}</p>
        <p className="text-sm font-medium text-gray-500">+ {point} Point</p>
        <div className="flex items-center w-full gap-2">
          <Progress
            value={progress}
            maxValue={100}
            className="flex-[3]"
            color={
              status === 'completed'
                ? 'default'
                : progress >= 100
                  ? 'success'
                  : 'primary'
            }
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-500">
              {currentMissionCount} / {maxMissionCount}
            </p>
          </div>
        </div>
      </div>
      <Button size="sm" className="bg-transparent">
        {status === 'completed' && (
          <Button size="sm" color="default" className="bg-transparent">
            <GoCheck className="text-2xl" />
          </Button>
        )}
        {status === 'ongoing' && progress < 100 && (
          <IoIosArrowBack className="rotate-180 text-2xl" />
        )}
        {status === 'ongoing' && progress >= 100 && (
          <Button size="sm" color="success">
            Get it
          </Button>
        )}
      </Button>
    </div>
  );
};

export default Task;
