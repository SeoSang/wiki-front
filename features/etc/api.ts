import axios from 'axios';
import { BACKEND_URL } from '../../dummy/env';

export const loadMainNoticesAPI = async () => {
  const result = await axios.get(`${BACKEND_URL}/board/list`, {
    params: {
      categoryId: 3,
      page: 1,
      amount: 10,
    },
  });
  return result;
};
