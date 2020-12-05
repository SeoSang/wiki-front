import axios from 'axios';
import { BACKEND_URL } from '../../dummy/env';
import { FavoriteSubjectInfo } from '../subject/type';
import { RegisterFormData } from './type';

export const loginAPI = async (email: string, password: string) => {
  const result = await axios.post(`${BACKEND_URL}/api/login`, {
    email,
    password,
  });
  return result;
};

export const registerAPI = async (formData: RegisterFormData) => {
  const result = await axios.post(`${BACKEND_URL}/api/user/register`, {
    user: formData,
  });
  return result;
};

export const getPostsAPI = async (
  categoryId: number,
  page: number,
  amount: number
) => {
  const result = await axios.get(`${BACKEND_URL}/board/list/`, {
    params: {
      categoryId: categoryId,
      page: page,
      amount: amount,
    },
  });
  return result.data;
};

export const postPostsAPI = async (contents: object) => {
  const result = await axios.post(`http://localhost:8080/mywiki/board/insert`, {
    contents,
  });
  return result;
};

export const doubleCheckAPI = async (email: string) => {
  const result = await axios.post(`${BACKEND_URL}/api/user/emailcheck`, {
    email,
  });
  return result;
};

export const addFavoriteAPI = async (favorite: FavoriteSubjectInfo) => {
  const result = await axios.post(
    `${BACKEND_URL}/api/fav/insert`,
    { favorite },
    {}
  );
  return result;
};
