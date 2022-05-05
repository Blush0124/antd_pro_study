import { request } from 'umi';
export const getPerson = async () => {
  return request('/api/persons');
};
