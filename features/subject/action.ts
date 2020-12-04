import { createAsyncThunk } from '@reduxjs/toolkit';
import { loadSubjectsAPI } from './api';

const NAME = 'subject';

export const loadSubjects = createAsyncThunk(
  `${NAME}/loadSubjects`, // 액션 이름 정의
  async ({}: {}, thunkAPI) => {
    try {
      return await loadSubjectsAPI();
    } catch (e) {
      return thunkAPI.rejectWithValue(await e.response.data);
    }
  }
);
