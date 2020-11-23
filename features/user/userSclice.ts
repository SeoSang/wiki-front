import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { loginAPI } from './api';
import { UserState } from './type';

const NAME = 'user';

export const login = createAsyncThunk(
  `${NAME}/login`, // 액션 이름 정의
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      return await loginAPI(email, password);
    } catch (e) {
      return thunkAPI.rejectWithValue(await e.response.data);
    }
  }
);

const initialState: UserState = {
  me: null,
  favorites: [],
  loginLoading: false,
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
