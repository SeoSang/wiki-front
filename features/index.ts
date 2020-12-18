import { combineReducers, configureStore, createStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { UserState, PageInfo } from './user/type';
import { BoardState } from './board/type';
import { WikiState } from './wiki/type';
import board from './board/boardSlice';
import user from './user/userSclice';
import subject from './subject/subjectSlice';
import { SubjectState } from './subject/type';

export interface RootState {
  user: UserState;
  page: PageInfo;
  board: BoardState;
  subject: SubjectState;
}

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const reducer = combineReducers({
  user,
  board,
  subject,
});

export const store = configureStore({ reducer: reducer });
