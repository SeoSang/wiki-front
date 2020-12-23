import { createAsyncThunk } from '@reduxjs/toolkit';
import { FavoriteSubjectInfo } from '../subject/type';
import {
  addFavoriteAPI,
  deleteFavoriteAPI,
  doubleCheckAPI,
  loginAPI,
  logoutAPI,
  registerAPI,
  loadMeAPI,
  reportPostAPI,
} from './api';
import { RegisterFormData, ReportPostFormInfo } from './type';
import _ from 'lodash';

const NAME = 'user';

export const loadMe = createAsyncThunk(
  `${NAME}/loadMe`, // 액션 이름 정의
  async ({}: {}, thunkAPI) => {
    try {
      const result = await loadMeAPI();
      return _.pick(result, ['data', 'status', 'statusText']);
    } catch (e) {
      return thunkAPI.rejectWithValue(await e.response.data);
    }
  }
);

export const login = createAsyncThunk(
  `${NAME}/login`, // 액션 이름 정의
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const result = await loginAPI(email, password);
      console.log(result);
      return _.pick(result, ['data', 'status', 'statusText']);
    } catch (e) {
      return thunkAPI.rejectWithValue(await e.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  `${NAME}/logout`, // 액션 이름 정의
  async ({}: {}, thunkAPI) => {
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
      return _.pick(result, ['data', 'status']);
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
      return _.pick(result, ['data', 'status']);
    } catch (e) {
      return thunkAPI.rejectWithValue(await e.response.data);
    }
  }
);

export const deleteFavorite = createAsyncThunk(
  `${NAME}/addFavorite`, // 액션 이름 정의
  async ({ favoriteId }: { favoriteId: number }, thunkAPI) => {
    try {
      const result = await deleteFavoriteAPI(favoriteId);
      return _.pick(result, ['data', 'status']);
    } catch (e) {
      return thunkAPI.rejectWithValue(await e.response.data);
    }
  }
);

export const reportPost = createAsyncThunk(
  `${NAME}/reportPost`, // 액션 이름 정의
  async (reportForm: ReportPostFormInfo, thunkAPI) => {
    try {
      const result = await reportPostAPI(reportForm);
      return _.pick(result, ['data', 'status']);
    } catch (e) {
      return thunkAPI.rejectWithValue(await e.response.data);
    }
  }
);
