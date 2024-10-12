import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi, getOrdersApi } from '../utils/burger-api';

export const getFeedsApiThunk = createAsyncThunk('feed/getFeed', () =>
  getFeedsApi().then((result) => result)
);

export const getOrdersApiThunk = createAsyncThunk('order/getOrders', () =>
  getOrdersApi().then((result) => result)
);
