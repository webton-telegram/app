import { type Props as TaskItem } from 'components/Task';

const tasks: TaskItem[] = [
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

export default tasks;
