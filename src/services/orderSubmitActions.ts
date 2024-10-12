import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../utils/burger-api';

export const orderBurgerApiThunk = createAsyncThunk(
  'orders/orderSubmit',
  (data: string[]) => orderBurgerApi(data).then((result) => result)
);
