import { createAsyncThunk } from '@reduxjs/toolkit';
import { loadPostAPI, loadPostsAPI, addPostApi, updatePostAPI } from './api';
import { AddPostFormData } from './type';

const NAME = 'board';
const AMOUNT = 8;

export const addPost = createAsyncThunk(
  `${NAME}/addPost`, // 액션 이름 정의
  async ({ post }: { post: AddPostFormData }, thunkAPI) => {
    try {
      return await addPostApi(post);
    } catch (e) {
      return thunkAPI.rejectWithValue(await e.response.data);
    }
  }
);

export const loadPost = createAsyncThunk(
  `${NAME}/loadPost`, // 액션 이름 정의
  async ({ postId }: { postId: number }, thunkAPI) => {
    try {
      return await loadPostAPI(postId);
    } catch (e) {
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
