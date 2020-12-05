import { createAsyncThunk } from '@reduxjs/toolkit';
import { loadSubjectsAPI, searchSubjectsAPI } from './api';
import { FavoriteSubjectInfo } from './type';

const NAME = 'subject';

export const loadSubjects = createAsyncThunk(
  `${NAME}/loadSubjects`, // 액션 이름 정의
  async ({}: {}, thunkAPI) => {
    try {
      const result = await loadSubjectsAPI();
      return Object.assign({}, result);
    } catch (e) {
      return thunkAPI.rejectWithValue(await e.response.data);
    }
  }
);

export const searchSubjects = createAsyncThunk(
  `${NAME}/searchSubjects`, // 액션 이름 정의
  async ({ searchName }: { searchName: string }, thunkAPI) => {
    try {
      const result = await searchSubjectsAPI(searchName);
      return result.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(await e.response.data);
    }
  }
);
