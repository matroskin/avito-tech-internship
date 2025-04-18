import { api } from '@/api/axios';
import type { UserTask } from '@/types/user';

export const getUserTasks = async (userId: number): Promise<UserTask[]> => {
  const response = await api.get(`/users/${userId}/tasks`);
  return response.data.data;
};
