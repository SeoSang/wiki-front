import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  loadPostAPI,
  loadPostsAPI,
  addPostApi,
  updatePostAPI,
  addCommentAPI,
  updateCommentAPI,
  loadCommentsAPI,
  deleteCommentAPI,
  deletePostApi,
} from './api';
import {
  AddPostFormData,
  AddCommentFormData,
  UpdatePostFormData,
  UpdateCommentFormData,
  DeleteCommentFormData,
} from './type';
import _ from 'lodash';
import { UpdateWikiFormData } from './../wiki/type';

const NAME = 'board';
const AMOUNT = 3;

export const addPost = createAsyncThunk(
  `${NAME}/addPost`, // 액션 이름 정의
  async ({ post }: { post: AddPostFormData }, thunkAPI) => {
    try {
      const result = await addPostApi(post);
      return _.pick(result, ['status', 'data', 'statusText']);
    } catch (e) {
      const result = _.pick(e.response, ['data', 'status', 'statusText']);
      return thunkAPI.rejectWithValue(result);
    }
  }
);

export const loadPost = createAsyncThunk(
  `${NAME}/loadPost`, // 액션 이름 정의
  async ({ boardId }: { boardId: number }, thunkAPI) => {
    try {
      return await loadPostAPI(boardId);
    } catch (e) {
      const result = _.pick(e.response, ['data', 'status', 'statusText']);
      return thunkAPI.rejectWithValue(result);
    }
  }
);

export const deletePost = createAsyncThunk(
  `${NAME}/deletePost`,
  async ({ boardId }: { boardId: number }, thunkAPI) => {
    try {
      const result = await deletePostApi(boardId);
      return result;
    } catch (e) {
      const result = _.pick(e.response, ['data', 'status', 'statusText']);
      return thunkAPI.rejectWithValue(result);
    }
  }
);

export const updatePost = createAsyncThunk(
  `${NAME}/updatePost`, // 액션 이름 정의
  async ({ post }: { post: UpdatePostFormData }, thunkAPI) => {
    try {
      return await updatePostAPI(post);
    } catch (e) {
      const result = _.pick(e.response, ['data', 'status', 'statusText']);
      return thunkAPI.rejectWithValue(result);
    }
  }
);

export const loadPosts = createAsyncThunk(
  `${NAME}/loadPosts`, // 액션 이름 정의
  async (
    {
      subjectId,
      categoryId,
      page,
    }: { subjectId: number; categoryId: number; page: number },
    thunkAPI
  ) => {
    try {
      const result = await loadPostsAPI(subjectId, categoryId, page, AMOUNT);
      return _.pick(result, ['data', 'status', 'statusText']);
    } catch (e) {
      const result = _.pick(e.response, ['data', 'status', 'statusText']);
      return thunkAPI.rejectWithValue(result);
    }
  }
);

export const loadComments = createAsyncThunk(
  `${NAME}/loadComments`,
  async ({ boardId }: { boardId: number }, thunkAPI) => {
    try {
      const result = await loadCommentsAPI(boardId);
      return result;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const addComment = createAsyncThunk(
  `${NAME}/addComment`, // 액션 이름 정의
  async ({ comment }: { comment: AddCommentFormData }, thunkAPI) => {
    try {
      const result = await addCommentAPI(comment);
      return result; /*_.pick(result, ['data, status']);*/
    } catch (e) {
      const result = _.pick(e.response, ['data', 'status', 'statusText']);
      return thunkAPI.rejectWithValue(result);
    }
  }
);

export const updateComment = createAsyncThunk(
  `${NAME}/updateComment`,
  async ({ comment }: { comment: UpdateCommentFormData }, thunkAPI) => {
    try {
      const result = await updateCommentAPI(comment);
      return result;
    } catch (e) {
      const result = _.pick(e.response, ['data', 'status', 'statusText']);
      return thunkAPI.rejectWithValue(result);
    }
  }
);

export const deleteComment = createAsyncThunk(
  `${NAME}/deleteComment`,
  async ({ comment }: { comment: DeleteCommentFormData }, thunkAPI) => {
    try {
      const result = await deleteCommentAPI(comment);
      return result;
    } catch (e) {
      const result = _.pick(e.response, ['data', 'status', 'statusText']);
      return thunkAPI.rejectWithValue(result);
    }
  }
);
