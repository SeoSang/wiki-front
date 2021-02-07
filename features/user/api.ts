import axios from 'axios';
import { BACKEND_URL } from '../../dummy/env';
import { FavoriteSubjectInfo } from '../subject/type';
import {
  RegisterFormData,
  ReportPostFormInfo,
  UserUpdateFormData,
} from './type';

export const loadMeAPI = async () => {
  const result = await axios.get(`${BACKEND_URL}/api/main`, {
    withCredentials: true,
  });
  return result;
};

export const loginAPI = async (email: string, password: string) => {
  const result = await axios.post(
    `${BACKEND_URL}/api/user/login`,
    {
      email,
      password,
    },
    {
      withCredentials: true,
    }
  );
  return result;
};

export const logoutAPI = async () => {
  const result = await axios.get(`${BACKEND_URL}/api/user/logout`, {
    withCredentials: true,
  });
  return result;
};

export const registerAPI = async (formData: RegisterFormData) => {
  const result = await axios.post(`${BACKEND_URL}/api/user/register`, formData);
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
  const result = await axios.post(
    `${BACKEND_URL}/api/user/emailcheck`,
    {
      email,
    },
    { withCredentials: true }
  );
  return result;
};

export const userUpdateAPI = async (formdata: UserUpdateFormData) => {
  const result = await axios.post(`${BACKEND_URL}/api/user/update`, formdata, {
    withCredentials: true,
  });
  return result;
};

export const addFavoriteAPI = async (
  userId: number,
  subjectId: number,
  iconName: string
) => {
  const result = await axios.post(
    `${BACKEND_URL}/api/fav/insert`,
    { userId, subjectId, iconName },
    { withCredentials: true }
  );
  return result;
};

export const deleteFavoriteAPI = async (favoriteId: number) => {
  const result = await axios.delete(`${BACKEND_URL}/api/fav/delete`, {
    data: { favSubjectId: favoriteId },
    withCredentials: true,
  });
  return result;
};

export const reportPostAPI = async (reportForm: ReportPostFormInfo) => {
  const result = await axios.put(`${BACKEND_URL}/report`, reportForm, {
    withCredentials: true,
  });
  return result;
};

export const passwordCheckAPI = async (password: string) => {
  const result = await axios.post(
    `${BACKEND_URL}/api/user/passcheck`,
    { password },
    {
      withCredentials: true,
    }
  );
  return result;
};
