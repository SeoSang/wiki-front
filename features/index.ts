import { combineReducers, configureStore, createStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { UserState, PageInfo } from './user/type';
import { BoardState } from './board/type';
import { WikiState } from './wiki/type';
import board from './board/boardSlice';
import user from './user/userSlice';
import subject from './subject/subjectSlice';
import admin from './admin/adminSclie';
import wiki from './wiki/wikiSlice'
import etc from './etc/etcSlice';
import { SubjectState } from './subject/type';
import { AdminState } from './admin/type';
import { EtcState } from './etc/type';

export interface RootState {
  user: UserState;
  page: PageInfo;
  board: BoardState;
  subject: SubjectState;
  admin: AdminState;
  wiki : WikiState;
  etc: EtcState;
}

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const reducer = combineReducers({
  user,
  board,
  subject,
  admin,
  wiki
  etc,
});

export const store = configureStore({ reducer: reducer });
