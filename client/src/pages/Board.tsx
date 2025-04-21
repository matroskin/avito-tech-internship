import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { TaskStatusColumn } from '@/components/TaskStatusColumn';
import { issueStore } from '@/stores/IssueStore';
import { boardStore } from '@/stores/BoardStore';
import { taskModalStore } from '@/stores/TaskModalStore';

const BoardPage = observer(() => {
  const { id } = useParams<{ id: string }>();

  const board = boardStore.boards.find((b) => b.id === Number(id));

  useEffect(() => {
    if (id) {
      const boardId = Number(id);
      issueStore.fetchBoardIssues(boardId);
      taskModalStore.setCurrentBoardId(boardId);
    }

    if (boardStore.boards.length === 0) {
      boardStore.fetchBoardsList();
    }

    if (taskModalStore.selectedTaskId) {
      const selectedTask = issueStore.issues.find((issue) => issue.id === taskModalStore.selectedTaskId);
      if (selectedTask) {
        taskModalStore.close(); // Открываем задачу для редактирования
        taskModalStore.openEdit(selectedTask); // Открываем задачу для редактирования
      }
    }
  }, [id]);

  // Разделяем задачи по статусам
  const statuses = ['Backlog', 'InProgress', 'Done'];

  return (
    <Layout>
      <h2 className="text-2xl font-medium mb-4 flex items-center gap-2">{board && board.name}</h2>

      <div className="flex gap-4 w-full">
        {statuses.map((status) => (
          <TaskStatusColumn key={status} status={status} />
        ))}
      </div>
    </Layout>
  );
});

export default BoardPage;
