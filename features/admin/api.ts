import axios from 'axios';
import { BACKEND_URL } from '../../dummy/env';

export const getAllReportsAPI = async () => {
  const result = await axios.get(`${BACKEND_URL}/admin/getAllReports`, {
    withCredentials: true,
  });
  return result;
};
