import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllReportsAPI } from './api';
import _ from 'lodash';

const NAME = 'admin';

export const getAllReports = createAsyncThunk(
  `${NAME}/getAllReports`, // 액션 이름 정의
  async ({}: {}, thunkAPI) => {
    try {
      const result = await getAllReportsAPI();
      console.log(result);
      return _.pick(result, ['data', 'status', 'statusText']);
    } catch (e) {
      return thunkAPI.rejectWithValue(await e.response.data);
    }
  }
);
