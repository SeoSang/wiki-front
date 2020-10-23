import { combineReducers, configureStore, createStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { userSlice } from './user/userSclice';

interface RootState {
  user: {
    test: number;
  };
}

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const reducer = combineReducers({ user: userSlice.reducer });

export const store = configureStore({ reducer: reducer });
