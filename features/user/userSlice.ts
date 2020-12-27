import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import {
  addFavorite,
  deleteFavorite,
  doubleCheck,
  loadMe,
  login,
  logout,
  register,
  reportPost,
} from './action';
import { UserState } from './type';

export const NAME = 'user';

const initialState: UserState = {
  me: null,
  favorites: [],
  loginLoading: false,
  isLogined: false,
  isRegistered: false,
  isDoubleCheckOK: false,
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
    [loadMe.pending.type]: (state, action) => {
      state = initialState;
    },
    [loadMe.fulfilled.type]: (state, action) => {
      console.log(action.payload);
      state.me = action.payload.data.user;
      state.isLogined = true;
      state.favorites = action.payload.data.favorites;
    },
    [loadMe.rejected.type]: (
      state,
      action: PayloadAction<{ message: string; status: number }>
    ) => {
      state.me = null;
      state.isLogined = false;
      state.favorites = [];
    },
    [login.pending.type]: (state, action) => {
      state.loginLoading = true;
      state.isLogined = false;
    },
    [login.fulfilled.type]: (state, action) => {
      console.log(action.payload);
      alert('로그인 성공!');
      state.me = action.payload.data.user;
      state.loginLoading = false;
      state.isLogined = true;
    },
    [login.rejected.type]: (
      state,
      action: PayloadAction<{ message: string; status: number }>
    ) => {
      console.log(action.payload);
      console.log(action.type);
      alert('로그인 실패!');
      state.loginLoading = false;
      state.me = null;
      state.favorites = [];
    },
    [logout.pending.type]: (state, action) => {
      state = initialState;
    },
    [logout.fulfilled.type]: (state, action) => {
      alert('로그아웃 성공!');
    },
    [logout.rejected.type]: (state, action) => {
      alert('로그아웃 비정상적 성공..');
      console.log(action.payload);
    },
    [register.pending.type]: (state, action) => {
      state.isRegistered = false;
    },
    [register.fulfilled.type]: (state, action) => {
      state.isRegistered = true;
      alert('회원가입 성공!');
      console.log(action.payload);
    },
    [register.rejected.type]: (
      state,
      action: PayloadAction<{ message: string; status: number }>
    ) => {
      state.isRegistered = false;
      alert('회원가입 실패!');
    },
    [doubleCheck.pending.type]: (state, action) => {
      state.isDoubleCheckOK = false;
    },
    [doubleCheck.fulfilled.type]: (state, action) => {
      alert(action.payload.data.msg);
      if (action.payload.data.msg) state.isDoubleCheckOK = true;
      else state.isDoubleCheckOK = false;
    },
    [doubleCheck.rejected.type]: (
      state,
      action: PayloadAction<{ message: string; status: number }>
    ) => {
      state.isDoubleCheckOK = false;
      alert('서버 오류!!');
    },
    [addFavorite.fulfilled.type]: (state, action) => {
      alert('즐겨찾기 추가 완료!');
      console.log(action.payload);
    },
    [addFavorite.rejected.type]: (
      state,
      action: PayloadAction<{ message: string; status: number }>
    ) => {
      alert('즐겨 찾기 추가 실패ㅠ');
    },
    [deleteFavorite.fulfilled.type]: (state, action) => {
      alert('즐겨찾기 삭제 완료!');
      console.log(action.payload);
      state.favorites = action.payload.data;
    },
    [deleteFavorite.rejected.type]: (
      state,
      action: PayloadAction<{ message: string; status: number }>
    ) => {
      alert('즐겨 찾기 삭제 실패ㅠ');
    },
    [reportPost.fulfilled.type]: (state, action) => {
      alert('신고가 정상적으로 처리되었습니다!');
    },
    [reportPost.rejected.type]: (
      state,
      action: PayloadAction<{ message: string; status: number }>
    ) => {
      alert('신고에 문제가 발생했습니다');
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