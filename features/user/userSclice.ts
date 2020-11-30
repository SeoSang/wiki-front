import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { login, register } from './action';
import { UserState } from './type';

export const NAME = 'user';

const initialState: UserState = {
  me: null,
  favorites: [],
  loginLoading: false,
  isLogined: false,
  isRegistered: false,
};

export const userSlice = createSlice({
  name: NAME,

  // 초기값
  initialState: initialState,

  reducers: {
    resetUserState: (state) => {
      state = initialState;
    },
  },
  extraReducers: {
    [login.pending.type]: (state, action) => {
      // 호출 전
      state.loginLoading = true;
    },
    [login.fulfilled.type]: (state, action) => {
      // 성공
      state.loginLoading = false;
      state.me = action.payload.data;
      console.log(action.payload);
    },
    [login.rejected.type]: (
      state,
      action: PayloadAction<{ message: string; status: number }>
    ) => {
      // 실패
      state.loginLoading = false;
      state.me = null;
      state.favorites = [];
    },
    [register.pending.type]: (state, action) => {
      // 호출 전
      state.isRegistered = false;
    },
    [register.fulfilled.type]: (state, action) => {
      // 성공
      state.isRegistered = true;
      alert('회원가입 성공!');
      console.log(action.payload);
    },
    [register.rejected.type]: (
      state,
      action: PayloadAction<{ message: string; status: number }>
    ) => {
      // 실패
      state.isRegistered = false;
      alert('회원가입 실패!');
    },
  },
});

export const { resetUserState } = userSlice.actions;

export const favoritesSelector = (state: RootState) => state.user.favorites;
export const meSelector = (state: RootState) => state.user.me;

/* 
  이런식으로 사용
  const me = useSelector(meSelector);
  const favorites = useSelector(favoritesSelector);
*/

export default userSlice.reducer;
