import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { loadPostsAPI } from './api';
import { BoardState } from './type';

const NAME = 'board';
const AMOUNT = 8;

export const loadPosts = createAsyncThunk(
  `${NAME}/loadPosts`, // 액션 이름 정의
  async (
    { categoryId, page }: { categoryId: number; page: number },
    thunkAPI
  ) => {
    try {
      return await loadPostsAPI(categoryId, page, AMOUNT);
    } catch (e) {
      return thunkAPI.rejectWithValue(await e.response.data);
    }
  }
);

const initialState: BoardState = {
  posts: [],
  isLoadingPosts: false,
};

export const boardSlice = createSlice({
  name: NAME,

  // 초기값
  initialState: initialState,

  reducers: {
    resetBoardState: (state) => {
      state = initialState;
    },
  },
  extraReducers: {
    [loadPosts.pending.type]: (state, action) => {
      // 호출 전
      state.isLoadingPosts = true;
    },
    [loadPosts.fulfilled.type]: (state, action) => {
      // 성공
      state.isLoadingPosts = false;
      console.log(action.payload);
      alert('성공!');
    },
    [loadPosts.rejected.type]: (
      state,
      action: PayloadAction<{ message: string; status: number }>
    ) => {
      // 실패
      state.isLoadingPosts = false;
      state.posts = [];
    },
  },
});

export const { resetBoardState } = boardSlice.actions;

export const postsSelector = (state: RootState) => state.board.posts;

/* 
  이런식으로 사용
  const me = useSelector(meSelector);
  const favorites = useSelector(favoritesSelector);
*/

export default boardSlice.reducer;
