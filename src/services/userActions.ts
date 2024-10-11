import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '../utils/types';
import { setIsAuthChecked, setIsLoading } from '../slices/userSlice';

import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  TLoginData,
  TRegisterData
} from '../utils/burger-api';
import { deleteCookie, getCookie, setCookie } from '../utils/cookie';

export const setUser = createAction<TUser | null, 'SET_USER'>('SET_USER');

export const registerUserThunk = createAsyncThunk(
  'users/registerUser',
  ({ email, name, password }: TRegisterData) =>
    registerUserApi({ email, name, password }).then((result) => {
      setCookie('accessToken', result.accessToken);
      localStorage.setItem('refreshToken', result.refreshToken);
    })
);

export const loginUserThunk = createAsyncThunk(
  'users/loginUser',
  ({ email, password }: TLoginData) =>
    loginUserApi({ email, password }).then((result) => {
      setCookie('accessToken', result.accessToken);
      localStorage.setItem('refreshToken', result.refreshToken);

      return result.user;
    })
);

export const updateUserThunk = createAsyncThunk(
  'users/updateUser',
  (user: Partial<TRegisterData>) =>
    updateUserApi(user).then((result) => result.user)
);

export const logoutUserThunk = createAsyncThunk('users/logoutUser', () =>
  logoutApi().then((token) => {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  })
);

export const getUserThunk = createAsyncThunk('users/getUser', () =>
  getUserApi()
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    try {
      if (getCookie('accessToken')) {
        dispatch(setIsLoading(true));
        const user = await getUserApi();
        dispatch(setUser(user.user));
      } else {
        dispatch(setUser(null));
      }
    } catch (ex) {
      dispatch(setUser(null));
    } finally {
      dispatch(setIsAuthChecked(true));
      dispatch(setIsLoading(false));
    }
  }
);
