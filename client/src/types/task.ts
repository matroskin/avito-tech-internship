export type Task = {
  id: number;
  title: string;
  description: string;
  status: 'Backlog' | 'InProgress' | 'Done';
  priority: 'Low' | 'Medium' | 'High';
  boardId?: number;
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
  priority: 'Low' | 'Medium' | 'High';
};

export type UpdateTaskDto = {
  assigneeId: number;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Backlog' | 'InProgress' | 'Done';
};

export type UpdateTaskStatus = {
  status: 'Backlog' | 'InProgress' | 'Done';
};
