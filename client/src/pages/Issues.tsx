import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Badge } from '@/components/ui/badge';
import { Layout } from '@/components/Layout';
import { AlertDestructive } from '@/components/AlertDestructive';
import { SkeletonCard } from '@/components/SkeletonCard';
import { TaskCard } from '@/components/TaskCard';
import { IssueSearch } from '@/components/IssueSearch';
import { StatusFilter } from '@/components/StatusFilter';
import { BoardFilter } from '@/components/BoardFilter';
import { EmptyState } from '@/components/EmptyState';
import { issueStore } from '@/stores/IssueStore';
import { boardStore } from '@/stores/BoardStore';

const IssuesPage = observer(() => {
  const { filteredIssues, issues, error } = issueStore;

  useEffect(() => {
    issueStore.fetchIssuesList();
    boardStore.fetchBoardsList();
  }, []);

  const isLoading = !error && issues.length === 0;
  const isEmptyFiltered = !error && !isLoading && filteredIssues.length === 0;

  return (
    <Layout>
      <h2 className="text-2xl font-medium mb-4 flex items-center gap-2">
        Все задачи <Badge>{filteredIssues.length}</Badge>
      </h2>

      {error ? (
        <AlertDestructive error={error} />
      ) : (
        <>
          <div className="flex flex-col items-start gap-4 md:flex-row mb-6 justify-between ">
            <IssueSearch />
            <div className="flex gap-4">
              <StatusFilter />
              <BoardFilter />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {isLoading ? (
              <SkeletonCard />
            ) : isEmptyFiltered ? (
              <EmptyState message="По вашему запросу ничего не найдено" />
            ) : (
              filteredIssues.map((issue) => <TaskCard key={issue.id} issue={issue} />)
            )}
          </div>
        </>
      )}
    </Layout>
  );
});

export default IssuesPage;
