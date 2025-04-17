import { Input } from '@/components/ui/input';
import { issueStore } from '@/stores/IssueStore';

export function IssueSearch() {
  return (
    <div className="w-full flex items-center gap-4">
      <Input
        className="w-full md:w-[320px]"
        placeholder="Поиск по названию или исполнителю"
        value={issueStore.search}
        onChange={(e) => issueStore.setSearch(e.target.value)}
      />
    </div>
  );
}
