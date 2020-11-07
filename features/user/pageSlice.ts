import { createSlice } from '@reduxjs/toolkit';

export interface pageSliceState {
  start: number;
  end: number;
  current: number;
  currentPosts: Post[];
}

const posts: Post[] = [
  {
    postId: 1,
    userId: 201421353,
    subjectId: 1,
    title: '첫 번째 게시물 입미다',
    content: '첫 번째',
    createdAt: '2020-10-17 21:33',
  },
  {
    postId: 2,
    userId: 201521355,
    subjectId: 2,
    title: '두 번째 게시물 입미다',
    content: '수업하나요?',
    createdAt: '2020-10-17 23:23',
  },
  {
    postId: 3,
    userId: 201521311,
    subjectId: 3,
    title: '세 번째 게시물 입미다',
    content: '수업왜하나요?',
    createdAt: '2020-10-17 23:23',
  },
  {
    postId: 4,
    userId: 201621323,
    subjectId: 4,
    title: '네 번째 게시물 입미다',
    content: '수업하나요?',
    createdAt: '2020-10-18 24:23',
  },
  {
    postId: 5,
    userId: 201621323,
    subjectId: 4,
    title: '다섯 번째 게시물 입미다',
    content: '수업하나요?',
    createdAt: '2020-10-18 24:23',
  },
  {
    postId: 6,
    userId: 201621323,
    subjectId: 4,
    title: '여섯 번째 게시물 입미다',
    content: '수업하나요?',
    createdAt: '2020-10-18 24:23',
  },
  {
    postId: 35,
    userId: 201621323,
    subjectId: 4,
    title: '일곱 번째 게시물 입미다',
    content: '수업하나요?',
    createdAt: '2020-10-18 24:23',
  },
];

export const pageSlice = createSlice({
  name: 'page',
  initialState: {
    start: 0,
    end: 5,
    current: 1,
    currentPosts: [],
  } as pageSliceState,
  reducers: {
    updateCurrentPage: (state, action) => {
      return {
        ...state,
        current: action.payload,
      };
    },
    updateStartEndPage: (state, action) => {
      return {
        ...state,
        start: action.payload.start,
        end: action.payload.end,
      };
    },
    loadPosts: state => {
      // 서버에서 posts 받아오기
      // 비동기 처리가 필요할수도
      // 페이지 개수세기
      return {
        ...state,
        currentPosts: posts, // 이건 서버에서 받아온 posts
      };
    },
  },
});

export const {
  updateCurrentPage,
  updateStartEndPage,
  loadPosts,
} = pageSlice.actions;
