import { api } from '@/api/axios';
import type { UpdateTaskStatus } from '@/types/task';

export const updateTaskStatus = async (taskId: number, data: UpdateTaskStatus) => {
  const response = await api.put(`/tasks/updateStatus/${taskId}`, data);
  return response.data.data;
};
