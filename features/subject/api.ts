import axios from 'axios';
import { BACKEND_URL } from '../../dummy/env';

export const loadSubjectsAPI = async () => {
  const result = await axios.get(`${BACKEND_URL}/ 미정`);
  return result;
};

export const searchSubjectsAPI = async (searchName: string) => {
  const result = await axios.get(`${BACKEND_URL}/searchSubject`, {
    params: { searchName },
  });
  return result;
};
