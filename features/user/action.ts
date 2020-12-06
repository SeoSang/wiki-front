import { createAsyncThunk } from '@reduxjs/toolkit';
import { FavoriteSubjectInfo } from '../subject/type';
import {
  addFavoriteAPI,
  doubleCheckAPI,
  loginAPI,
  logoutAPI,
  registerAPI,
} from './api';
import { RegisterFormData } from './type';

const NAME = 'user';

export const login = createAsyncThunk(
  `${NAME}/login`, // 액션 이름 정의
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      return await loginAPI(email, password);
    } catch (e) {
      return thunkAPI.rejectWithValue(await e.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  `${NAME}/logout`, // 액션 이름 정의
  async ({}, thunkAPI) => {
    try {
      return await logoutAPI();
    } catch (e) {
      return thunkAPI.rejectWithValue(await e.response.data);
    }
  }
);

export const register = createAsyncThunk(
  `${NAME}/register`, // 액션 이름 정의
  async (formData: RegisterFormData, thunkAPI) => {
    try {
      return await registerAPI(formData);
    } catch (e) {
      return thunkAPI.rejectWithValue(await e.response.data);
    }
  }
);

export const doubleCheck = createAsyncThunk(
  `${NAME}/doubleCheck`, // 액션 이름 정의
  async (email: string, thunkAPI) => {
    try {
      const result = await doubleCheckAPI(email);
      return Object.assign(result);
    } catch (e) {
      return thunkAPI.rejectWithValue(await e.response.data);
    }
  }
);

export const addFavorite = createAsyncThunk(
  `${NAME}/addFavorite`, // 액션 이름 정의
  async ({ favorite }: { favorite: FavoriteSubjectInfo }, thunkAPI) => {
    try {
      const result = await addFavoriteAPI(favorite);
      return Object.assign({}, result);
    } catch (e) {
      return thunkAPI.rejectWithValue(await e.response.data);
    }
  }
);
