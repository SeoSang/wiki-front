import axios from 'axios';
import { BACKEND_URL } from '..';
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
