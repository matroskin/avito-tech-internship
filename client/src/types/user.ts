import { TaskStatusEnum, TaskPriorityEnum } from './task';

export type User = {
  id: number;
  fullName: string;
  email: string;
  avatarUrl: string;
  description: string;
  tasksCount: number;
  teamId: number;
  teamName: string;
};

export type UserTask = {
  id: number;
  title: string;
  description: string;
  status: TaskStatusEnum;
  priority: TaskPriorityEnum;
  boardName: string;
};
