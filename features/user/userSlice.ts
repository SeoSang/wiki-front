import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import {
  addFavorite,
  deleteFavorite,
  doubleCheck,
  loadMe,
  login,
  logout,
  passwordCheck,
  register,
  reportPost,
  userUpdate,
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
  passCheckOK: false,
};

export const userSlice = createSlice({
  name: NAME,

  // 초기값
  initialState: Object.assign(initialState, {}),

  reducers: {
    resetUserState: (state) => {
      state = Object.assign(initialState, {});
    },
  },
  extraReducers: {
    [loadMe.pending.type]: (state, action) => {
      state = Object.assign(initialState, {});
    },
    [loadMe.fulfilled.type]: (state, action) => {
      state.me = action.payload.data.user;
      state.isLogined = true;
      state.favorites = action.payload.data.favorites;
    },
    [loadMe.rejected.type]: (
      state,
      action: PayloadAction<{ message: string; status: number; data: any }>
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
      alert('로그인 성공!');
      state.me = action.payload.data.user;
      state.loginLoading = false;
      state.isLogined = true;
    },
    [login.rejected.type]: (
      state,
      action: PayloadAction<{ message: string; status: number }>
    ) => {
      if (action.payload?.status === 401)
        alert('아이디와 비밀번호가 일치하지 않습니다!');
      else alert('로그인 실패!');
      state.loginLoading = false;
      state.me = null;
      state.favorites = [];
    },
    [logout.fulfilled.type]: (state, action) => {
      alert('로그아웃 성공!');
      state.me = null;
      state.favorites = [];
      state.isLogined = false;
    },
    [logout.rejected.type]: (state, action) => {
      alert('로그아웃 비정상적 성공..');
    },
    [register.pending.type]: (state, action) => {
      state.isRegistered = false;
    },
    [register.fulfilled.type]: (state, action) => {
      state.isRegistered = true;
      alert('회원가입 성공!');
    },
    [register.rejected.type]: (state, action) => {
      state.isRegistered = false;
      alert('회원가입 실패!');
    },
    [passwordCheck.pending.type]: (state, action) => {
      state.passCheckOK = false;
    },
    [passwordCheck.fulfilled.type]: (state, action) => {
      state.passCheckOK = true;
      alert('인증되었습니다!');
    },
    [passwordCheck.rejected.type]: (state, action) => {
      state.passCheckOK = false;
      alert('실패!');
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
      if (action.payload.status === 409) {
        alert('중복된 이메일입니다!!');
      } else alert('서버 오류!!');
    },
    [addFavorite.fulfilled.type]: (state, action) => {
      alert('즐겨찾기 추가 완료!');
    },
    [addFavorite.rejected.type]: (
      state,
      action: PayloadAction<{ message: string; status: number; data: any }>
    ) => {
      alert('즐겨 찾기 추가 실패ㅠ');
      state.favorites = action.payload.data.favorite;
    },
    [userUpdate.fulfilled.type]: (state, action) => {
      alert('정보 수정 완료!');
      state.me = action.payload.data.users;
    },
    [userUpdate.rejected.type]: (
      state,
      action: PayloadAction<{ message: string; status: number; data: any }>
    ) => {
      if (action.payload.status === 409) {
        alert('값이 올바르지 않습니다!');
      }
      alert('서버 오류!');
    },
    [deleteFavorite.fulfilled.type]: (state, action) => {
      alert('즐겨찾기 삭제 완료!');
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
