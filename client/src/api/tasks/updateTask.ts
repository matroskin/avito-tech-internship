import { api } from '@/api/axios';
import type { UpdateTaskDto } from '@/types/task';

export const updateTask = async (taskId: number, data: UpdateTaskDto) => {
  const response = await api.put(`/tasks/update/${taskId}`, data);
  return response.data.data;
};
