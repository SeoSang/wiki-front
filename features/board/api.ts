import axios from 'axios';
import { BACKEND_URL } from '../../dummy/env';
import {
  AddPostFormData,
  AddCommentFormData,
  UpdatePostFormData,
  UpdateCommentFormData,
  DeleteCommentFormData,
} from './type';

export const loadPostsAPI = async (
  subjectId: number,
  categoryId: number,
  page: number,
  amount: number
) => {
  const result = await axios.get(`${BACKEND_URL}/board/list`, {
    params: { subjectId, categoryId, page, amount },
  });
  return result;
};

export const loadPostAPI = async (boardId: number) => {
  const result = await axios.get(`${BACKEND_URL}/board/viewDetail`, {
    params: { boardId: boardId },
  });
  return result;
};

export const updatePostAPI = async (post: UpdatePostFormData) => {
  const result = await axios.put(`${BACKEND_URL}/board/update`, post, {
    withCredentials: true,
  });
  return result;
};

export const addPostApi = async (post: AddPostFormData) => {
  console.log(post);
  const result = await axios.post(`${BACKEND_URL}/board/insert`, post, {
    withCredentials: true,
  });
  return result;
};

export const deletePostApi = async (boardId: number) => {
  const result = await axios.delete(`${BACKEND_URL}/board/delete`, {
    params: {
      boardId: boardId,
    },
  });
  return result;
};

export const loadCommentsAPI = async (boardId: number) => {
  const result = await axios.get(`${BACKEND_URL}/board/showComments/`, {
    params: boardId,
  });
  return result;
};

export const addCommentAPI = async (comment: AddCommentFormData) => {
  const result = await axios.post(
    `${BACKEND_URL}/board/inputComment`,
    comment,
    { withCredentials: true }
  );
  return result;
};

export const updateCommentAPI = async (comment: UpdateCommentFormData) => {
  const result = await axios.put(
    `${BACKEND_URL}/board/updateComment`,
    comment,
    {
      withCredentials: true,
    }
  );

  return result.data;
};

export const deleteCommentAPI = async (comment: DeleteCommentFormData) => {
  const result = await axios.delete(`${BACKEND_URL}/board/deleteComment`, {
    params: {
      comment,
    },
  });

  return result.data;
};
