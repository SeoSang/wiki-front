import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { loadPost, loadPosts } from './action';
import { loadPostsAPI } from './api';
import { BoardState } from './type';

const NAME = 'board';
const AMOUNT = 8;

const initialState: BoardState = {
  post: null,
  posts: [],
  isLoadingPost: false,
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
    [loadPost.pending.type]: (state, action) => {
      // 호출 전
      state.isLoadingPost = true;
      state.post = null;
    },
    [loadPost.fulfilled.type]: (state, action) => {
      // 성공
      state.isLoadingPost = false;
      console.log(action.payload);
      state.post = action.payload.data;
    },
    [loadPost.rejected.type]: (
      state,
      action: PayloadAction<{ message: string; status: number }>
    ) => {
      // 실패
      state.isLoadingPost = false;
      state.post = null;
      alert('에러가 발생하였습니다!');
    },
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
