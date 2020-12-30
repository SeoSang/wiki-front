import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import {
  addPost,
  loadPost,
  loadPosts,
  updatePost,
  deletePost,
  loadComments,
  addComment,
  deleteComment,
  updateComment,
} from './action';
import { BoardState, Post } from './type';

const NAME = 'board';
const AMOUNT = 3;

const initialState: BoardState = {
  post: null,
  posts: [],
  comments: [],
  isLoadingPost: false,
  isLoadingPosts: false,
  addingPostSuccess: false,
  addingCommentSuccess: false,
  page: 0,
  total: 0,
  updatingPostSuccess: false,
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
      action.payload.data.BoardVO.subjectId = null;
      state.post = action.payload.data.BoardVO;
      state.comments = action.payload.data.commentMap;
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
    [updatePost.pending.type]: (state, action) => {
      state.updatingPostSuccess = false;
    },
    [updatePost.fulfilled.type]: (state, action) => {
      state.updatingPostSuccess = true;
      alert('게시글 수정 성공!.');
    },
    [updatePost.rejected.type]: (
      state,
      action: PayloadAction<{ message: string; status: number }>
    ) => {
      state.updatingPostSuccess = false;
      alert('서버 에러가 발생했습니다.');
    },
    [deletePost.pending.type]: (state, action) => {},
    [deletePost.fulfilled.type]: (state, action) => {
      console.log('성공');
    },
    [deletePost.rejected.type]: (state, action) => {
      console.log(action);
      console.log('ㅇㅎ류');
    },

    [loadPosts.pending.type]: (state, action) => {
      state.isLoadingPosts = true;
      state.posts = [];
      state.total = 0;
    },
    [loadPosts.fulfilled.type]: (state, action) => {
      state.isLoadingPosts = false;
      console.log(action.payload);
      action.payload.data.BoardMap.forEach((item : Post)=> {
        if(item.subjectId == 0) item.subjectId = null;
      })
      state.posts = action.payload.data.BoardMap;
      state.total = action.payload.data.TotalCount;
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
    [loadComments.pending.type]: (state, action) => {},
    // [loadComments.fulfilled.type] : (state, action)=> {
    //   state.comments = action.payload.data.
    // },
    [addComment.fulfilled.type]: (state, action) => {
      alert('댓글 추가에 성공하셨습니다!');
      state.comments.push(action.payload.data);
      console.log(action.payload.data);
    },
    [addComment.rejected.type]: (
      state,
      action: PayloadAction<{ message: string; status: number }>
    ) => {
      console.log(action);
      alert('오류가 발생하였습니다..');
    },
    [updateComment.fulfilled.type] : (state, action) =>{
      state.comments = action.payload.commentList;
    },
    [updateComment.rejected.type] : (state, action) => {
      console.log(action);
    },
    [deleteComment.fulfilled.type] : (state, action)=> {
      state.comments = action.payload.commentList;
    },
    [deleteComment.rejected.type] : (state, action) => {
      console.log(action);
    }

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
