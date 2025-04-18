import { observer } from 'mobx-react-lite';
import { TaskCard } from '@/components/TaskCard';
import { issueStore } from '@/stores/IssueStore';

interface TaskStatusColumnProps {
  status: string;
}

const TaskStatusColumn = observer(({ status }: TaskStatusColumnProps) => {
  // Фильтрация задач по статусу
  const tasks = issueStore.boardIssues && issueStore.filteredBoardIssues(status);

  return (
    <div className="flex flex-col gap-4 w-1/3 p-4 bg-accent rounded-lg">
      <h3 className="text-xl font-semibold">{status}</h3>
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} issue={task} />
        ))}
      </div>
    </div>
  );
});

export { TaskStatusColumn };
