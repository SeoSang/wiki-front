import axios from 'axios';
import { BACKEND_URL } from '..';

export const loadPostsAPI = async (
  categoryId: number,
  page: number,
  amount: number
) => {
  const result = await axios.get(`${BACKEND_URL}/board/list`, {
    params: { categoryId, page, amount },
  });
  return result;
};
