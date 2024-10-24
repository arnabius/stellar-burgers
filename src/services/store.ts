/* eslint-disable prettier/prettier */
import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { userSlice } from '../slices/userSlice';
import { ingredientsSlice } from '../slices/ingredientsSlice';
import { constructorSlice } from '../slices/constructorSlice';
import { orderSubmitSlice } from '../slices/orderSubmitSlice';
import { feedSlice } from '../slices/feedSlice';
import { orderSlice } from '../slices/orderSlice';

const rootReducer = combineSlices(userSlice, constructorSlice, ingredientsSlice, orderSubmitSlice, feedSlice, orderSlice);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();

export default store;
