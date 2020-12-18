import axios from 'axios';
import { BACKEND_URL } from '../../dummy/env';
import { AddPostFormData } from './type';

export const loadPostsAPI = async (
  subjectId: number,
  categoryId: number,
  page: number,
  amount: number
) => {
  const result = await axios.get(`${BACKEND_URL}/board/list`, {
    params: { subjectId, categoryId, page, amount },
  });
  console.log(result);
  return result;
};

export const loadPostAPI = async (boardId: number) => {
  const result = await axios.get(`${BACKEND_URL}/board/viewDetail`, {
    params: { boardId: boardId },
  });
  return result;
};

export const updatePostAPI = async (
  postId: number,
  title: string,
  text: string
) => {
  const result = await axios.get(`${BACKEND_URL}/board/viewDetail`, {
    params: { postId, title, text },
  });
  return result;
};

export const addPostApi = async (post: AddPostFormData) => {
  const result = await axios.post(`${BACKEND_URL}/board/insert`, post, {
    withCredentials: true,
  });
  return result;
};

export const addCommentAPI = async (
  userId: number,
  boardId: number,
  commentText: string
) => {
  const result = await axios.post(
    `${BACKEND_URL}/board/inputComment`,
    { userId, boardId, commentText },
    { withCredentials: true }
  );
  return result;
};
