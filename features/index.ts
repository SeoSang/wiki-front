import { combineReducers, configureStore, createStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { userSlice } from './user/userSclice';
import { UserState } from './user/type';
import { pageSlice, pageSliceState } from './user/pageSlice';
import { BoardState } from './board/type';
import { boardSlice } from './board/boardSlice';

export const BACKEND_URL = 'http://localhost:8005/project_wings_war';
export interface RootState {
  user: UserState;
  page: pageSliceState;
  board: BoardState;
}

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const reducer = combineReducers({
  user: userSlice.reducer,
  page: pageSlice.reducer,
  board: boardSlice.reducer,
});

export const store = configureStore({ reducer: reducer });
