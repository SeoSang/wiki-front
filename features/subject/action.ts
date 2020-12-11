import { createAsyncThunk } from '@reduxjs/toolkit';
import { loadSubjectsAPI, searchSubjectsAPI } from './api';
import { FavoriteSubjectInfo } from './type';
import _ from 'lodash';

const NAME = 'subject';

export const loadSubjects = createAsyncThunk(
  `${NAME}/loadSubjects`, // 액션 이름 정의
  async ({}: {}, thunkAPI) => {
    try {
      const result = await loadSubjectsAPI();
      return _.pick(result, ['status', 'data', 'statusText']);
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
