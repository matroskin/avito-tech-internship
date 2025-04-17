import { observer } from 'mobx-react-lite';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { issueStore } from '@/stores/IssueStore';
import { boardStore } from '@/stores/BoardStore';

export const BoardFilter = observer(() => {
  return (
    <Select
      value={issueStore.boardFilter?.toString() ?? 'all'}
      onValueChange={(value) => issueStore.setBoardFilter(value === 'all' ? null : parseInt(value))}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Фильтр по доске" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="all">Все доски</SelectItem>
          {boardStore.boards.map((board) => (
            <SelectItem key={board.id} value={board.id.toString()}>
              {board.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
});
