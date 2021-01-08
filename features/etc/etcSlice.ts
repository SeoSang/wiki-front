import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { loadMainNotices } from './action';
import { EtcState } from './type';

export const NAME = 'user';

const initialState: EtcState = {
  reportPostModalOpen: false,
  pwCheckModalOpen: false,
  IconNameModalOpen: false,
  notices: null,
};

export const etcSclie = createSlice({
  name: NAME,

  // 초기값
  initialState: initialState,

  reducers: {
    openPwCheckModal: (state) => {
      state.pwCheckModalOpen = true;
    },
    closePwCheckModal: (state) => {
      state.pwCheckModalOpen = false;
    },
    openReportPostModal: (state) => {
      state.reportPostModalOpen = true;
    },
    closeReportPostModal: (state) => {
      state.reportPostModalOpen = false;
    },
    openIconNameModal: (state) => {
      state.IconNameModalOpen = true;
    },
    closeIconNameModal: (state) => {
      state.IconNameModalOpen = false;
    },
  },
  extraReducers: {
    [loadMainNotices.pending.type]: (state, action) => {
      state.notices = null;
    },
    [loadMainNotices.fulfilled.type]: (state, action) => {
      state.notices = action.payload.data.BoardMap;
    },
    [loadMainNotices.rejected.type]: (state, action) => {
      state.notices = null;
    },
  },
});

export const {
  openPwCheckModal,
  closePwCheckModal,
  openReportPostModal,
  closeReportPostModal,
  openIconNameModal,
  closeIconNameModal,
} = etcSclie.actions;

export default etcSclie.reducer;
