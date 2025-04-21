import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { boardStore } from '@/stores/BoardStore';
import { userStore } from '@/stores/UserStore';
import { taskModalStore } from '@/stores/TaskModalStore';
import { Link } from 'react-router-dom';

export const TaskDialog = observer(() => {
  useEffect(() => {
    if (userStore.users.length === 0) {
      userStore.fetchUsers();
    }
  }, []);

  const handleSubmit = async () => {
    await taskModalStore.submit();
  };

  const handleClose = () => {
    taskModalStore.close();
  };

  return (
    <Dialog open={taskModalStore.isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{taskModalStore.mode === 'create' ? 'Создание задачи' : 'Редактирование задачи'}</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Название</Label>
            <Input
              id="title"
              value={taskModalStore.title}
              onChange={(e) => taskModalStore.setField('title', e.target.value)}
              placeholder="Введите название задачи"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              value={taskModalStore.description}
              onChange={(e) => taskModalStore.setField('description', e.target.value)}
              placeholder="Введите описание задачи"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="board">Проект</Label>
            <Select
              value={taskModalStore.boardId ? String(taskModalStore.boardId) : ''}
              onValueChange={(value) => taskModalStore.setField('boardId', Number(value))}
              disabled={taskModalStore.mode === 'edit'}
            >
              <SelectTrigger id="board" className="w-full">
                <SelectValue placeholder="Выберите проект" />
              </SelectTrigger>
              <SelectContent>
                {boardStore.boards.map((board) => (
                  <SelectItem key={board.id} value={String(board.id)}>
                    {board.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Приоритет</Label>
              <Select
                value={taskModalStore.priority}
                onValueChange={(value) => taskModalStore.setField('priority', value as typeof taskModalStore.priority)}
              >
                <SelectTrigger id="priority" className="w-full">
                  <SelectValue placeholder="Выберите приоритет" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Статус</Label>
              <Select
                value={taskModalStore.status}
                onValueChange={(value) => taskModalStore.setField('status', value as typeof taskModalStore.status)}
              >
                <SelectTrigger id="status" className="w-full">
                  <SelectValue placeholder="Выберите статус" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Backlog">Backlog</SelectItem>
                  <SelectItem value="InProgress">InProgress</SelectItem>
                  <SelectItem value="Done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="assignee">Исполнитель</Label>
            <Select
              value={taskModalStore.assigneeId ? String(taskModalStore.assigneeId) : ''}
              onValueChange={(value) => taskModalStore.setField('assigneeId', Number(value))}
            >
              <SelectTrigger id="assignee" className="w-full">
                <SelectValue placeholder="Выберите исполнителя" />
              </SelectTrigger>
              <SelectContent>
                {userStore.users.map((user) => (
                  <SelectItem key={user.id} value={String(user.id)}>
                    {user.fullName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {taskModalStore.mode === 'edit' && taskModalStore.task?.boardId && (
            <Link to={`/board/${taskModalStore.task.boardId}`} className="text-sm text-primary hover:underline">
              Перейти на доску
            </Link>
          )}

          <DialogFooter className="pt-4">
            <Button onClick={handleSubmit}>{taskModalStore.mode === 'create' ? 'Создать' : 'Обновить'}</Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
});
