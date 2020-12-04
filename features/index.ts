import { combineReducers, configureStore, createStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { userSlice } from './user/userSclice';
import { UserState, PageInfo, boardContentInfo } from './user/type';
import { BoardState } from './board/type';
import { boardSlice } from './board/boardSlice';
import { SubjectState } from './subject/type';

export interface RootState {
  user: UserState;
  page: PageInfo;
  board: BoardState;
  subject: SubjectState;
}

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const reducer = combineReducers({
  user: userSlice.reducer,
  board: boardSlice.reducer,
});

export const store = configureStore({ reducer: reducer });
