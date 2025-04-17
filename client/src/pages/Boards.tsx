import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Layout } from '@/components/Layout';
import { SkeletonCard } from '@/components/SkeletonCard';
import { ProjectCard } from '@/components/ProjectCard';
import { AlertDestructive } from '@/components/AlertDestructive';
import { boardStore } from '@/stores/BoardStore';

const BoardsPage = observer(() => {
  const { boards, error } = boardStore;

  useEffect(() => {
    boardStore.fetchBoardsList();
  }, []);

  return (
    <Layout>
      <h2 className="text-2xl font-medium mb-4">Проекты</h2>

      {error && <AlertDestructive error={error} />}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {!error && boards.length === 0 ? (
          <SkeletonCard />
        ) : (
          boards.map((board) => <ProjectCard key={board.id} board={board} />)
        )}
      </div>
    </Layout>
  );
});

export default BoardsPage;
