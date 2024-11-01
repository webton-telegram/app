import { Button, Card } from '@nextui-org/react';

import LayoutContainer from 'components/layout/LayoutContainer';
import Task from 'components/Task';

import { dailyTask, weeklyTasks } from 'data/task';

const Mission = () => (
  <LayoutContainer>
    <div className="py-4 space-y-4">
      <Card className="p-4 space-y-4 bg-gray-50 dark:bg-gray-950">
        <h3 className="text-lg font-bold">Daily Reward</h3>
        <Task
          title={dailyTask.title}
          point={dailyTask.point}
          status={dailyTask.status}
        >
          {dailyTask.status === 'ongoing' ? (
            <Task.OngoingGetItButton />
          ) : (
            <Task.CompletedButton />
          )}
        </Task>
      </Card>

      <Card className="p-4 space-y-4 bg-gray-50 dark:bg-gray-950">
        <h3 className="text-lg font-bold">Weekly Reward</h3>
        {weeklyTasks.map((task) => (
          <Task
            key={task.title}
            title={task.title}
            point={task.point}
            status={task.status}
            progress={
              <Task.Progress
                currentMissionCount={task.currentMissionCount}
                maxMissionCount={task.maxMissionCount}
                status={task.status}
              />
            }
          >
            {task.status === 'completed' && <Task.CompletedButton />}
            {task.status === 'ongoing' &&
              task.currentMissionCount < task.maxMissionCount && (
                <Task.OngoingArrowButton />
              )}
            {task.status === 'ongoing' &&
              task.currentMissionCount >= task.maxMissionCount && (
                <Task.OngoingGetItButton />
              )}
          </Task>
        ))}
      </Card>

      <Button size="lg" color="primary" fullWidth>
        Invite Friends on Telegram (+500 Point)
      </Button>
    </div>
  </LayoutContainer>
);

export default Mission;
