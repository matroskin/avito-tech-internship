import { observer } from 'mobx-react-lite';
import { issueStore } from '@/stores/IssueStore';
import { TaskCard } from '@/components/TaskCard';
import { taskModalStore } from '@/stores/TaskModalStore';

interface TaskStatusColumnProps {
  status: string;
}

export const TaskStatusColumn = observer(({ status }: TaskStatusColumnProps) => {
  const tasks = issueStore.boardIssues && issueStore.filteredBoardIssues(status);

  return (
    <div className="flex-1">
      <h3 className="text-lg font-medium mb-2">{status}</h3>
      <div className="space-y-2">
        {tasks.map((issue) => (
          <TaskCard key={issue.id} issue={issue} onClick={() => taskModalStore.openEdit(issue)} />
        ))}
      </div>
    </div>
  );
});
