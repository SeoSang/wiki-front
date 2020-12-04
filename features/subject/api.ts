import axios from 'axios';
import { BACKEND_URL } from '../../dummy/env';

export const loadSubjectsAPI = async () => {
  const result = await axios.get(`${BACKEND_URL}/api/login`);
  return result;
};
