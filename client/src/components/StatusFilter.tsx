import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { issueStore } from '@/stores/IssueStore';

export function StatusFilter() {
  return (
    <Select
      value={issueStore.statusFilter ?? 'all'}
      onValueChange={(value) => {
        issueStore.setStatusFilter(value === 'all' ? null : value);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Фильтр по статусу" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="all">Все статусы</SelectItem>
          <SelectItem value="Backlog">Backlog</SelectItem>
          <SelectItem value="InProgress">In Progress</SelectItem>
          <SelectItem value="Done">Done</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
