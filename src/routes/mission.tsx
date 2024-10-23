import { Button, Card } from '@nextui-org/react';

import LayoutContainer from 'components/layout/LayoutContainer';
import Task from 'components/Task';

import tasks from 'data/task';

const Mission = () => (
  <LayoutContainer>
    <div className="py-4 space-y-6">
      <Card className="p-4 bg-gray-50 dark:bg-gray-950">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold">Daily Reward</h3>
            <p className="text-sm text-gray-500">Day 1</p>
            <p className="text-sm font-medium text-gray-700">+ 100 Point</p>
          </div>
          <Button size="sm" color="success">
            Get it
          </Button>
        </div>
      </Card>

      <Card className="p-4 space-y-4 bg-gray-50 dark:bg-gray-950">
        <h3 className="text-lg font-bold">Weekly Reward</h3>
        {tasks.map((task) => (
          <Task key={task.title} {...task} />
        ))}
      </Card>

      <Button size="lg" color="primary" fullWidth>
        Invite Friends on Telegram (+500 Point)
      </Button>
    </div>
  </LayoutContainer>
);

export default Mission;
