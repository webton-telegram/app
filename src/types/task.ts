type Status = 'ongoing' | 'completed';

type TaskProgressMetrics = {
  currentMissionCount: number;
  maxMissionCount: number;
};

export type TaskItem = {
  title: string;
  point: number;
  status: Status;
};

export type TaskProgressProps = {
  status: Status;
} & TaskProgressMetrics;

export type TaskContainerProps = {
  progress?: React.ReactNode;
  children: React.ReactNode;
} & TaskItem;
