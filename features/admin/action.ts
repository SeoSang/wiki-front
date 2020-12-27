import { createAsyncThunk } from '@reduxjs/toolkit';
import { approveReportAPI, getAllReportsAPI, getAllUsersAPI } from './api';
import _ from 'lodash';
import { report } from 'process';

const NAME = 'admin';

export const getAllReports = createAsyncThunk(
  `${NAME}/getAllReports`, // 액션 이름 정의
  async ({ page, amount }: { page: number; amount: number }, thunkAPI) => {
    try {
      const result = await getAllReportsAPI(page, amount);
      console.log(result);
      return _.pick(result, ['data', 'status', 'statusText']);
    } catch (e) {
      return thunkAPI.rejectWithValue(await e.response.data);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  `${NAME}/getAllUsers`, // 액션 이름 정의
  async ({ page, amount }: { page: number; amount: number }, thunkAPI) => {
    try {
      const result = await getAllUsersAPI(page, amount);
      console.log(result);
      return _.pick(result, ['data', 'status', 'statusText']);
    } catch (e) {
      return thunkAPI.rejectWithValue(await e.response.data);
    }
  }
);

export const approveReport = createAsyncThunk(
  `${NAME}/approveReport`, // 액션 이름 정의
  async (
    { reportId, approve }: { reportId: number; approve: number },
    thunkAPI
  ) => {
    try {
      const result = await approveReportAPI(reportId, approve);
      console.log(result);
      return _.pick(result, ['data', 'status', 'statusText']);
    } catch (e) {
      return thunkAPI.rejectWithValue(await e.response.data);
    }
  }
);
