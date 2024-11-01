import { useMemo } from 'react';
import { Button, Progress } from '@nextui-org/react';
import { IoIosArrowBack } from 'react-icons/io';
import { GoCheck } from 'react-icons/go';
import { cn } from 'lib/utils';
import type { TaskProgressProps, TaskContainerProps } from 'types/task';

const TaskProgress = ({
  currentMissionCount,
  maxMissionCount,
  status,
}: TaskProgressProps) => {
  const progress = useMemo(
    () =>
      maxMissionCount === 0
        ? 0
        : Math.round((currentMissionCount / maxMissionCount) * 100),
    [currentMissionCount, maxMissionCount],
  );

  return (
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
  );
};

const CompletedButton = () => (
  <Button size="sm" className="bg-transparent">
    <GoCheck className="text-2xl" />
  </Button>
);

const OngoingArrowButton = () => (
  <Button size="sm" className="bg-transparent">
    <IoIosArrowBack className="rotate-180 text-2xl" />
  </Button>
);

const OngoingGetItButton = () => (
  <Button size="sm" color="success">
    Get it
  </Button>
);

const TaskContainer = ({
  title,
  point,
  status,
  progress,
  children,
}: TaskContainerProps) => (
  <div
    className={cn(
      'flex justify-between items-center p-3 rounded-lg shadow-sm bg-content2',
      status === 'completed' && 'opacity-50',
    )}
  >
    <div className="flex flex-col w-full gap-1">
      <p className="text-sm font-medium">{title}</p>
      <p className="text-sm font-medium text-gray-500">+ {point} Point</p>
      {progress && progress}
    </div>
    {children}
  </div>
);

const Task = Object.assign(TaskContainer, {
  Progress: TaskProgress,
  CompletedButton,
  OngoingArrowButton,
  OngoingGetItButton,
});

export default Task;
