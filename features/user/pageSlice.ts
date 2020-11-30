import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {PageInfo} from './type'
import {getPostsAPI} from './api'

export const getPosts = createAsyncThunk(
  'getPosts',
  async(
    {categoryId, page, amount} : {categoryId : number, page:number, amount : number},
    thunkAPI
  ) => {
    try {
      return await getPostsAPI(categoryId, page, amount);
    }
    catch (e) {
      return thunkAPI.rejectWithValue(await e);
    }
  }
)

const initialState : PageInfo = {
  page : 1,
  amount : 10,
  start : 0,
  end : 5,
  currentPosts : [
    {
      postId : 1,
      userId : 1,
      subjectId : 1,
      title : 'dd',
      text : 'ff',
      createdAt : '2020/10/20', 
    }
  ]
}

export const pageSlice = createSlice({
  name: 'page',
  initialState: initialState,
  reducers: {
    updateCurrentPage: (state, action) => {
      return {
        ...state,
        page: action.payload,
      };
    },
    updateStartEndPage: (state, action) => {
      return {
        ...state,
        start: action.payload.start,
        end: action.payload.end,
      };
    },
    /*loadPosts: state => {
      // 서버에서 posts 받아오기
      // 비동기 처리가 필요할수도
      // 페이지 개수세기
      return {
        ...state,
        currentPosts: initialState.currentPosts, // 이건 서버에서 받아온 posts
      };
    },*/
  },
  extraReducers: {
    [getPosts.pending.type] : (state, action) => {
        state.start = 1;
        state.page = 1;
    },
    [getPosts.fulfilled.type] : (state, action) => {
      state.currentPosts = action.payload;
    }
  }
});

export const {
  updateCurrentPage,
  updateStartEndPage,
} = pageSlice.actions;

export default pageSlice.reducer;