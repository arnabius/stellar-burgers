import { TUserState, userSlice } from './userSlice';
import {
  loginUserThunk,
  logoutUserThunk,
  setUser,
  updateUserThunk
} from '../services/userActions';
import { TLoginData, TRegisterData } from '@api';
import { TUser } from '@utils-types';

describe('Тест userSlice', () => {
  const initialState: TUserState = {
    user: null,
    isAuthChecked: false,
    isLoading: false
  };

  const userData: TUser = {
    email: 'arnab@yandex.ru',
    name: 'Тестов Тест Тестович'
  };

  // данные, отправляемые для залогинивания
  const loginData: TLoginData = {
    email: 'arnab@yandex.ru',
    password: '111'
  };

  // данные, отправляемые для редактирования
  const updateData: TRegisterData = {
    email: 'arnab@yandex.ru',
    name: 'Тестов Тест Тестович',
    password: '111'
  };

  it('Тест userSlice setUser: установка данных юзера в state', () => {
    const actualState = {
      ...initialState,
      user: userData
    };

    const expectedState = setUser(userData);

    // и сравниваем их с ожидаемым результатом
    expect(actualState.user).toEqual(expectedState.payload);
  });

  it('Тест userSlice loginUserThunk pending: установка isLoading в true, isAuthChecked в false', () => {
    const actualState = userSlice.reducer(
      {
        ...initialState,
        isAuthChecked: false,
        isLoading: true
      },
      loginUserThunk.pending('', loginData)
    );

    const expectedState = {
      user: null,
      isAuthChecked: false,
      isLoading: true
    };

    // и сравниваем их с ожидаемым результатом
    expect(actualState).toEqual(expectedState);
  });

  it('Тест userSlice loginUserThunk fulfilled: установка isLoading в false, isAuthChecked в true, данных юзера в state', () => {
    const actualState = userSlice.reducer(
      {
        ...initialState,
        user: userData,
        isAuthChecked: true,
        isLoading: false
      },
      loginUserThunk.fulfilled(userData, '', loginData)
    );

    const expectedState = {
      user: userData,
      isAuthChecked: true,
      isLoading: false
    };

    expect(actualState).toEqual(expectedState);
  });

  it('Тест userSlice loginUserThunk rejected: установка isLoading в false, isAuthChecked в false', () => {
    const error = new Error('Test error');
    const actualState = userSlice.reducer(
      {
        ...initialState,
        user: null,
        isAuthChecked: false,
        isLoading: false
      },
      loginUserThunk.rejected(error, '', loginData)
    );

    const expectedState = {
      user: null,
      isAuthChecked: false,
      isLoading: false
    };

    expect(actualState).toEqual(expectedState);
  });

  it('Тест userSlice logoutUserThunk pending: установка isLoading в true, isAuthChecked в true', () => {
    const actualState = userSlice.reducer(
      {
        ...initialState,
        isAuthChecked: true,
        isLoading: true
      },
      logoutUserThunk.pending('')
    );

    const expectedState = {
      user: null,
      isAuthChecked: true,
      isLoading: true
    };

    // и сравниваем их с ожидаемым результатом
    expect(actualState).toEqual(expectedState);
  });

  it('Тест userSlice logoutUserThunk fulfilled: установка isLoading в false, isAuthChecked в false, обнуление данных юзера в state', () => {
    const empty: void = undefined;
    const actualState = userSlice.reducer(
      {
        ...initialState,
        user: null,
        isAuthChecked: false,
        isLoading: false
      },
      logoutUserThunk.fulfilled(empty, '')
    );

    const expectedState = {
      user: null,
      isAuthChecked: false,
      isLoading: false
    };

    expect(actualState).toEqual(expectedState);
  });

  it('Тест userSlice logoutUserThunk rejected: установка isLoading в false, isAuthChecked в false', () => {
    const error = new Error('Test error');
    const actualState = userSlice.reducer(
      {
        ...initialState,
        user: null,
        isAuthChecked: true,
        isLoading: false
      },
      logoutUserThunk.rejected(error, '')
    );

    const expectedState = {
      user: null,
      isAuthChecked: true,
      isLoading: false
    };

    expect(actualState).toEqual(expectedState);
  });

  it('Тест userSlice updateUserThunk pending: установка isLoading в true, isAuthChecked в true', () => {
    const actualState = userSlice.reducer(
      {
        ...initialState,
        isAuthChecked: true,
        isLoading: true
      },
      updateUserThunk.pending('', updateData)
    );

    const expectedState = {
      user: null,
      isAuthChecked: true,
      isLoading: true
    };

    // и сравниваем их с ожидаемым результатом
    expect(actualState).toEqual(expectedState);
  });

  it('Тест userSlice updateUserThunk fulfilled: установка isLoading в false, isAuthChecked в true, данных юзера в state', () => {
    const actualState = userSlice.reducer(
      {
        ...initialState,
        user: userData,
        isAuthChecked: true,
        isLoading: false
      },
      updateUserThunk.fulfilled(userData, '', updateData)
    );

    const expectedState = {
      user: userData,
      isAuthChecked: true,
      isLoading: false
    };

    expect(actualState).toEqual(expectedState);
  });

  it('Тест userSlice updateUserThunk rejected: установка isLoading в false, isAuthChecked в true', () => {
    const error = new Error('Test error');
    const actualState = userSlice.reducer(
      {
        ...initialState,
        user: null,
        isAuthChecked: true,
        isLoading: false
      },
      updateUserThunk.rejected(error, '', updateData)
    );

    const expectedState = {
      user: null,
      isAuthChecked: true,
      isLoading: false
    };

    expect(actualState).toEqual(expectedState);
  });
});
