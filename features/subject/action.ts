import { createAsyncThunk } from '@reduxjs/toolkit';
import { loadSubjectsAPI, searchSubjectsAPI, addSubjectApi } from './api';
import { FavoriteSubjectInfo, AddSubjectFormData } from './type';
import _ from 'lodash';

const NAME = 'subject';

export const loadSubjects = createAsyncThunk(
  `${NAME}/loadSubjects`, // 액션 이름 정의
  async ({}: {}, thunkAPI) => {
    try {
      const result = await loadSubjectsAPI();
      return _.pick(result, ['status', 'data', 'statusText']);
    } catch (e) {
      const result = _.pick(e.response, ['data', 'status', 'statusText']);
      return thunkAPI.rejectWithValue(result);
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
      const result = _.pick(e.response, ['data', 'status', 'statusText']);
      return thunkAPI.rejectWithValue(result);
    }
  }
);

export const addSubject = createAsyncThunk(
  `${NAME}/addSubject`,
  async ({ subject }: { subject: AddSubjectFormData }, thunkAPI) => {
    try {
      const result = await addSubjectApi(subject);
      return result.data;
    } catch (e) {
      const result = _.pick(e.response, ['data', 'status', 'statusText']);
      return thunkAPI.rejectWithValue(result);
    }
  }
);
