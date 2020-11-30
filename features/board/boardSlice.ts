import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { addPost, loadPost, loadPosts } from './action';
import { loadPostsAPI } from './api';
import { BoardState } from './type';

const NAME = 'board';
const AMOUNT = 8;

const initialState: BoardState = {
  post: null,
  posts: [],
  isLoadingPost: false,
  isLoadingPosts: false,
  addingPostSuccess: false,
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
      state.isLoadingPosts = true;
    },
    [loadPosts.fulfilled.type]: (state, action) => {
      state.isLoadingPosts = false;
      console.log(action.payload);
    },
    [loadPosts.rejected.type]: (
      state,
      action: PayloadAction<{ message: string; status: number }>
    ) => {
      state.isLoadingPosts = false;
      state.posts = [];
    },
    [addPost.pending.type]: (state, action) => {
      state.addingPostSuccess = false;
    },
    [addPost.fulfilled.type]: (state, action) => {
      alert('게시글 추가에 성공하셨습니다!');
      state.addingPostSuccess = true;
    },
    [addPost.rejected.type]: (
      state,
      action: PayloadAction<{ message: string; status: number }>
    ) => {
      console.log(action);
      alert('오류가 발생하였습니다..');
      state.addingPostSuccess = false;
    },
  },
});

export const { resetBoardState } = boardSlice.actions;

export const postsSelector = (state: RootState) => state.board.posts;
export const postSelector = (state: RootState) => state.board.post;

/* 
  이런식으로 사용
  const me = useSelector(meSelector);
  const favorites = useSelector(favoritesSelector);
*/

export default boardSlice.reducer;
