import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  // 액션 타입 문자열의 prefix로 들어간다. ex) "todos/addTodo"
  name: 'user',

  // 초기값
  initialState: { test: 0 },

  reducers: {
    addTest: (state) => {
      state.test++;
    },

    resetTest: (state) => {
      state.test = 0;
    },
  },
});

export const { addTest, resetTest } = userSlice.actions;
