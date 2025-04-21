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
import type { Task, CreateTaskDto, UpdateTaskDto, TaskStatusEnum, TaskPriorityEnum } from '@/types/task';

type Mode = 'create' | 'edit';

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: Mode;
  task?: Task;
  boardIdFromContext?: number;
  onSubmit: (data: CreateTaskDto | UpdateTaskDto) => void;
}

export const TaskDialog = observer(
  ({ open, onOpenChange, mode, task, boardIdFromContext, onSubmit }: TaskDialogProps) => {
    useEffect(() => {
      if (userStore.users.length === 0) {
        userStore.fetchUsers();
      }

      if (mode === 'edit' && task) {
        taskModalStore.title = task.title;
        taskModalStore.description = task.description;
        taskModalStore.priority = task.priority;
        taskModalStore.status = task.status;
        taskModalStore.assigneeId = task.assignee.id;
        taskModalStore.boardId = task.boardId ?? null;
      }

      if (mode === 'create' && boardIdFromContext) {
        taskModalStore.boardId = boardIdFromContext;
      }
    }, [mode, task, boardIdFromContext]);

    const handleSubmit = () => {
      if (mode === 'create') {
        if (!taskModalStore.boardId) return;
        onSubmit({
          title: taskModalStore.title,
          description: taskModalStore.description,
          assigneeId: taskModalStore.assigneeId,
          boardId: taskModalStore.boardId,
          priority: taskModalStore.priority,
        });
      } else {
        onSubmit({
          title: taskModalStore.title,
          description: taskModalStore.description,
          assigneeId: taskModalStore.assigneeId,
          priority: taskModalStore.priority,
          status: taskModalStore.status,
        });
      }

      taskModalStore.resetFields();
      onOpenChange(false);
    };

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{mode === 'create' ? 'Создание задачи' : 'Редактирование задачи'}</DialogTitle>
            <DialogDescription></DialogDescription>
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
                disabled={Boolean(boardIdFromContext)}
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
                  onValueChange={(value) => taskModalStore.setField('priority', value as TaskPriorityEnum)}
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
                  onValueChange={(value) => taskModalStore.setField('status', value as TaskStatusEnum)}
                >
                  <SelectTrigger id="status" className="w-full">
                    <SelectValue placeholder="Выберите статус" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Backlog">Backlog</SelectItem>
                    <SelectItem value="In Progress">InProgress</SelectItem>
                    <SelectItem value="Done">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="assignee">Исполнитель</Label>
              <Select
                value={String(taskModalStore.assigneeId)}
                onValueChange={(value) => taskModalStore.setField('assigneeId', Number(value))}
              >
                <SelectTrigger id="assignee" className="w-full">
                  <SelectValue placeholder="Выберите исполнителя" />
                </SelectTrigger>
                <SelectContent>
                  {userStore.users.length &&
                    userStore.users.map((user) => (
                      <SelectItem key={user.id} value={String(user.id)}>
                        {user.fullName}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {mode === 'edit' && !boardIdFromContext && task?.boardId && (
              <div className="pt-2">
                <a href={`/board/${task.boardId}`} className="text-sm text-primary hover:underline">
                  Перейти на доску
                </a>
              </div>
            )}

            <DialogFooter className="pt-4">
              <Button onClick={handleSubmit}>{mode === 'create' ? 'Создать' : 'Обновить'}</Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    );
  },
);
