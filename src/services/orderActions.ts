import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '../utils/burger-api';

export const getOrderByNumberApiThunk = createAsyncThunk(
  'order/getOrder',
  (orderNumber: number) =>
    getOrderByNumberApi(orderNumber).then((result) => result)
);
