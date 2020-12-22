import axios from 'axios';
import { BACKEND_URL } from '../../dummy/env';

export const loadSubjectsAPI = async () => {
  const result = await axios.get(`${BACKEND_URL}/api/subject/select`);
  return result;
};

export const searchSubjectsAPI = async (searchName: string) => {
  const result = await axios.get(`${BACKEND_URL}/searchSubject`, {
    params: { searchName },
    withCredentials: true,
  });
  return result;
};
