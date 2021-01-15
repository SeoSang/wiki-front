import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { approveReport, getAllReports, getAllUsers } from './action';
import { approveReportAPI } from './api';
import { AdminState, ReportInfo } from './type';

export const NAME = 'admin';

const initialState: AdminState = {
  reports: null,
  reportsTotal: 1,
  users: [],
  usersTotal: 1,
};

export const adminSlice = createSlice({
  name: NAME,

  // 초기값
  initialState: initialState,

  reducers: {},
  extraReducers: {
    [getAllReports.fulfilled.type]: (state, action) => {
      state.reportsTotal = action.payload.data.TotalCount;
      state.reports = action.payload.data.reportList;
    },
    [getAllReports.rejected.type]: (
      state,
      action: PayloadAction<{ message: string; status: number }>
    ) => {
      state.reports = null;
    },
    [getAllUsers.fulfilled.type]: (state, action) => {
      state.usersTotal = action.payload.data.TotalCount;
      state.users = action.payload.data.userList;
    },
    [approveReport.fulfilled.type]: (state, action) => {
      state.reports = action.payload.data.reportList;
    },
  },
});

// export const {} = adminSlice.actions;

export default adminSlice.reducer;
