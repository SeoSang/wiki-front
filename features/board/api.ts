import axios from 'axios';
import { BACKEND_URL } from '..';
import { AddPostFormData } from './type';

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

export const loadPostAPI = async (postId: number) => {
  const result = await axios.get(`${BACKEND_URL}/board/viewDetail`, {
    params: { postId },
  });
  return result;
};

export const addPostApi = async (post: AddPostFormData) => {
  const result = await axios.post(`${BACKEND_URL}/board/viewDetail`, post); // 추후에 쿠키 설정 넣어줘야함
  return result;
};
