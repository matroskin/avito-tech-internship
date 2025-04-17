import { api } from '@/api/axios';

export const getIssues = async () => {
  const response = await api.get('/tasks');
  return response.data.data;
};
