import { createAsyncThunk } from '@reduxjs/toolkit';
import { approveReportAPI, getAllReportsAPI, getAllUsersAPI } from './api';
import _ from 'lodash';

const NAME = 'admin';

export const getAllReports = createAsyncThunk(
  `${NAME}/getAllReports`, // 액션 이름 정의
  async ({ page, amount }: { page: number; amount: number }, thunkAPI) => {
    try {
      const result = await getAllReportsAPI(page, amount);
      return _.pick(result, ['data', 'status', 'statusText']);
    } catch (e) {
      const result = _.pick(e.response, ['data', 'status', 'statusText']);
      return thunkAPI.rejectWithValue(result);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  `${NAME}/getAllUsers`, // 액션 이름 정의
  async ({ page, amount }: { page: number; amount: number }, thunkAPI) => {
    try {
      const result = await getAllUsersAPI(page, amount);
      return _.pick(result, ['data', 'status', 'statusText']);
    } catch (e) {
      const result = _.pick(e.response, ['data', 'status', 'statusText']);
      return thunkAPI.rejectWithValue(result);
    }
  }
);

export const approveReport = createAsyncThunk(
  `${NAME}/approveReport`, // 액션 이름 정의
  async (
    {
      reportId,
      approve,
      page,
      amount,
    }: { reportId: number; approve: number; page: number; amount: number },
    thunkAPI
  ) => {
    try {
      const result = await approveReportAPI(reportId, approve, page, amount);
      return _.pick(result, ['data', 'status', 'statusText']);
    } catch (e) {
      const result = _.pick(e.response, ['data', 'status', 'statusText']);
      return thunkAPI.rejectWithValue(result);
    }
  }
);
