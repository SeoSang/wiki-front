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
  passwordCheckAPI,
  userUpdateAPI,
} from './api';
import {
  RegisterFormData,
  ReportPostFormInfo,
  UserUpdateFormData,
} from './type';
import _ from 'lodash';

const NAME = 'user';

export const loadMe = createAsyncThunk(
  `${NAME}/loadMe`, // 액션 이름 정의
  async ({}: {}, thunkAPI) => {
    try {
      const result = await loadMeAPI();
      return _.pick(result, ['data', 'status', 'statusText']);
    } catch (e) {
      const result = _.pick(e.response, ['data', 'status', 'statusText']);
      return thunkAPI.rejectWithValue(result);
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
      return _.pick(result, ['data', 'status', 'statusText']);
    } catch (e) {
      const result = _.pick(e.response, ['data', 'status', 'statusText']);
      return thunkAPI.rejectWithValue(result);
    }
  }
);

export const logout = createAsyncThunk(
  `${NAME}/logout`, // 액션 이름 정의
  async ({}: {}, thunkAPI) => {
    try {
      const result = await logoutAPI();
      return _.pick(result, ['data', 'status', 'statusText']);
    } catch (e) {
      const result = _.pick(e.response, ['data', 'status', 'statusText']);
      return thunkAPI.rejectWithValue(result);
    }
  }
);

export const register = createAsyncThunk(
  `${NAME}/register`, // 액션 이름 정의
  async (formData: RegisterFormData, thunkAPI) => {
    try {
      return await registerAPI(formData);
    } catch (e) {
      const result = _.pick(e.response, ['data', 'status', 'statusText']);
      return thunkAPI.rejectWithValue(result);
    }
  }
);

export const userUpdate = createAsyncThunk(
  `${NAME}/userUpdate`, // 액션 이름 정의
  async (formData: UserUpdateFormData, thunkAPI) => {
    try {
      return await userUpdateAPI(formData);
    } catch (e) {
      const result = _.pick(e.response, ['data', 'status', 'statusText']);
      return thunkAPI.rejectWithValue(result);
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
      const result = await e.response;
      return thunkAPI.rejectWithValue(_.pick(result, ['data', 'status']));
    }
  }
);

export const addFavorite = createAsyncThunk(
  `${NAME}/addFavorite`, // 액션 이름 정의
  async (
    {
      userId,
      subjectId,
      iconName,
    }: { userId: number; subjectId: number; iconName: string },
    thunkAPI
  ) => {
    try {
      const result = await addFavoriteAPI(userId, subjectId, iconName);
      return _.pick(result, ['data', 'status']);
    } catch (e) {
      const result = _.pick(e.response, ['data', 'status', 'statusText']);
      return thunkAPI.rejectWithValue(result);
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
      const result = _.pick(e.response, ['data', 'status', 'statusText']);
      return thunkAPI.rejectWithValue(result);
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
      const result = _.pick(e.response, ['data', 'status', 'statusText']);
      return thunkAPI.rejectWithValue(result);
    }
  }
);

export const passwordCheck = createAsyncThunk(
  `${NAME}/passwordCheck`, // 액션 이름 정의
  async ({ password }: { password: string }, thunkAPI) => {
    try {
      const result = await passwordCheckAPI(password);
      return _.pick(result, ['data', 'status']);
    } catch (e) {
      const result = _.pick(e.response, ['data', 'status', 'statusText']);
      return thunkAPI.rejectWithValue(result);
    }
  }
);
