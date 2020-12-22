import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { getAllReports } from './action';
import { AdminState, ReportInfo } from './type';

export const NAME = 'admin';

const initialState: AdminState = {
  reports: [],
};

export const adminSlice = createSlice({
  name: NAME,

  // 초기값
  initialState: initialState,

  reducers: {},
  extraReducers: {
    [getAllReports.pending.type]: (state, action) => {},
    [getAllReports.fulfilled.type]: (state, action) => {
      console.log(action.payload);
      state.reports = action.payload.reportList;
    },
    [getAllReports.rejected.type]: (
      state,
      action: PayloadAction<{ message: string; status: number }>
    ) => {
      state.reports = [];
    },
  },
});

// export const {} = adminSlice.actions;

export default adminSlice.reducer;
