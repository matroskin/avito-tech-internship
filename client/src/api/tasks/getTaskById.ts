import { api } from '@/api/axios';
import type { Task } from '@/types/task';

export const getTaskById = async (taskId: number): Promise<Task> => {
  const response = await api.get(`/tasks/${taskId}`);
  return response.data.data;
};
