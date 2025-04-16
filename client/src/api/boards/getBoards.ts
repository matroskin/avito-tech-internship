import { api } from '@/api/axios';

export const getBoards = async () => {
  const response = await api.get('/boards');
  return response.data.data;
};
