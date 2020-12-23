import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { EtcState } from './type';

export const NAME = 'user';

const initialState: EtcState = {
  reportPostModalOpen: false,
  pwCheckModalOpen: false,
};

export const etcSclie = createSlice({
  name: NAME,

  // 초기값
  initialState: initialState,

  reducers: {
    openPwCheckModal: state => {
      state.pwCheckModalOpen = true;
    },
    closePwCheckModal: state => {
      state.pwCheckModalOpen = false;
    },
    openReportPostModal: state => {
      state.reportPostModalOpen = true;
    },
    closeReportPostModal: state => {
      state.reportPostModalOpen = false;
    },
  },
  extraReducers: {},
});

export const {
  openPwCheckModal,
  closePwCheckModal,
  openReportPostModal,
  closeReportPostModal,
} = etcSclie.actions;

export default etcSclie.reducer;
