export type Task = {
  id: number;
  title: string;
  description: string;
  status: TaskStatusEnum;
  priority: TaskPriorityEnum;
  boardId: number;
  boardName: string;
  assignee: {
    id: number;
    fullName: string;
    email: string;
    avatarUrl: string;
  };
};

export type CreateTaskDto = {
  assigneeId: number;
  boardId: number;
  title: string;
  description: string;
  priority: TaskPriorityEnum;
};

export type UpdateTaskDto = {
  assigneeId: number;
  title: string;
  description: string;
  priority: TaskPriorityEnum;
  status: TaskStatusEnum;
};

export type UpdateTaskStatus = {
  status: TaskStatusEnum;
};

export type TaskStatusEnum = 'Backlog' | 'InProgress' | 'Done';

export type TaskPriorityEnum = 'Low' | 'Medium' | 'High';
