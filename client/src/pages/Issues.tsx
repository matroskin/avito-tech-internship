import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Layout } from '@/components/Layout';
import { SkeletonCard } from '@/components/SkeletonCard';
import { TaskCard } from '@/components/TaskCard';
import { AlertDestructive } from '@/components/AlertDestructive';
import { issueStore } from '@/stores/IssueStore';

const IssuesPage = observer(() => {
  const { issues, error } = issueStore;

  useEffect(() => {
    issueStore.fetchIssuesList();
  }, []);

  return (
    <Layout>
      <h2 className="text-2xl font-medium mb-4">Все задачи</h2>

      {error && <AlertDestructive error={error} />}

      <div className="flex flex-col gap-4">
        {!error && issues.length === 0 ? (
          <SkeletonCard />
        ) : (
          issues.map((issue) => <TaskCard key={issue.id} issue={issue} />)
        )}
      </div>
    </Layout>
  );
});

export default IssuesPage;
