import { combineReducers, configureStore, createStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { userSlice } from './user/userSclice';
import { pageSlice, pageSliceState } from './user/pageSlice';

interface RootState {
  user: {
    test: number;
  };
  page: pageSliceState;
}

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const reducer = combineReducers({
  user: userSlice.reducer,
  page: pageSlice.reducer,
});

export const store = configureStore({ reducer: reducer });
