export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'Backlog' | 'In Progress' | 'Done';
  priority: 'Low' | 'Medium' | 'High';
  boardId: number;
  boardName: string;
  assignee: {
    id: number;
    fullName: string;
    email: string;
    avatarUrl: string;
  };
}
