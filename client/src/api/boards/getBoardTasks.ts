import { api } from '@/api/axios';
import type { Task } from '@/types/task';

export const getBoardTasks = async (boardId: number): Promise<Task[]> => {
  const response = await api.get(`/boards/${boardId}`);
  return response.data.data;
};
