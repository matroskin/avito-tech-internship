import { api } from '@/api/axios';
import type { Board } from '@/types/board';

export const getBoards = async (): Promise<Board[]> => {
  const response = await api.get('/boards');
  return response.data.data;
};
