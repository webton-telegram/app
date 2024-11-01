import type { TaskItem, TaskProgressProps } from 'types/task';

type Task = TaskItem & TaskProgressProps;

export const dailyTask: TaskItem = {
  title: 'Day 1',
  point: 100,
  status: 'ongoing',
};

export const weeklyTasks: Task[] = [
  {
    title: 'Share Webtoon 5 Times or More',
    point: 100,
    currentMissionCount: 1,
    maxMissionCount: 5,
    status: 'ongoing',
  },
  {
    title: 'Click Ads 10 Times or More',
    point: 100,
    currentMissionCount: 8,
    maxMissionCount: 10,
    status: 'ongoing',
  },
  {
    title: 'View Webtoon 40 Times or More',
    point: 100,
    currentMissionCount: 40,
    maxMissionCount: 40,
    status: 'ongoing',
  },
  {
    title: 'Like Webtoon 20 Times or More',
    point: 100,
    currentMissionCount: 20,
    maxMissionCount: 20,
    status: 'completed',
  },
  {
    title: 'Watch Ads 20 Times or More',
    point: 100,
    currentMissionCount: 1,
    maxMissionCount: 1,
    status: 'completed',
  },
];
