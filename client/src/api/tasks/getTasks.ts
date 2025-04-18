import { api } from '@/api/axios';
import type { Task } from '@/types/task';

export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get('/tasks');
  return response.data.data;
};
