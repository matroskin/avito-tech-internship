import { api } from '@/api/axios';
import type { CreateTaskDto } from '@/types/task';

export const createTask = async (data: CreateTaskDto) => {
  const response = await api.post('/tasks/create', data);
  return response.data.data;
};
