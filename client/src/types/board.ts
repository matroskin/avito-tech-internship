import { TaskPriorityEnum, TaskStatusEnum } from './task';

export type Board = {
  id: number;
  name: string;
  description: string;
  taskCount: number;
};

export type BoardTask = {
  id: number;
  title: string;
  description: string;
  status: TaskStatusEnum;
  priority: TaskPriorityEnum;
  assignee: {
    id: number;
    fullName: string;
    email: string;
    avatarUrl: string;
  };
};
