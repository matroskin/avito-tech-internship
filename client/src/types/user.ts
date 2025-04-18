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
  status: 'Backlog' | 'InProgress' | 'Done';
  priority: 'Low' | 'Medium' | 'High';
  boardName: string;
};
