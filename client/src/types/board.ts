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
  status: 'Backlog' | 'InProgress' | 'Done';
  priority: 'Low' | 'Medium' | 'High';
  assignee: {
    id: number;
    fullName: string;
    email: string;
    avatarUrl: string;
  };
};
