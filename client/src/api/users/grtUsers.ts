import { api } from '@/api/axios';
import type { User } from '@/types/user';

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get('/users');
  return response.data.data;
};
