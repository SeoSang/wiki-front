import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  loadPostAPI,
  loadPostsAPI,
  addPostApi,
  updatePostAPI,
  addCommentAPI,
} from './api';
import { AddPostFormData } from './type';
import _ from 'lodash';

const NAME = 'board';
const AMOUNT = 3;

export const addPost = createAsyncThunk(
  `${NAME}/addPost`, // 액션 이름 정의
  async ({ post }: { post: AddPostFormData }, thunkAPI) => {
    try {
      const result = await addPostApi(post);
      console.log(_.pick(result, ['status', 'data', 'statusText']));
      return _.pick(result, ['status', 'data', 'statusText']);
    } catch (e) {
      return thunkAPI.rejectWithValue(await e.response.data);
    }
  }
);

export const loadPost = createAsyncThunk(
  `${NAME}/loadPost`, // 액션 이름 정의
  async ({ boardId }: { boardId: number }, thunkAPI) => {
    try {
      return await loadPostAPI(boardId);
    } catch (e) {
      console.log(e)
      return thunkAPI.rejectWithValue(await e.response.data);
    }
  }
);

export const updatePost = createAsyncThunk(
  `${NAME}/updatePost`, // 액션 이름 정의
  async (
    { postId, title, text }: { postId: number; title: string; text: string },
    thunkAPI
  ) => {
    try {
      return await updatePostAPI(postId, title, text);
    } catch (e) {
      return thunkAPI.rejectWithValue(await e.response.data);
    }
  }
);

export const loadPosts = createAsyncThunk(
  `${NAME}/loadPosts`, // 액션 이름 정의
  async (
    { subjectId, categoryId, page }: { subjectId:number; categoryId: number; page: number },
    thunkAPI
  ) => {
    try {
      return await loadPostsAPI(subjectId, categoryId, page, AMOUNT);
    } catch (e) {
      return thunkAPI.rejectWithValue(await e.response.data);
    }
  }
);

export const addComment = createAsyncThunk(
  `${NAME}/addComment`, // 액션 이름 정의
  async (
    {
      userId,
      boardId,
      commentText,
    }: { userId: number; boardId: number; commentText: string },
    thunkAPI
  ) => {
    try {
      const result = await addCommentAPI(userId, boardId, commentText);
      return _.pick(result, ['data, status']);
    } catch (e) {
      return thunkAPI.rejectWithValue(await e.response.data);
    }
  }
);
