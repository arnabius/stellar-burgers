import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsApiThunk, getOrdersApiThunk } from '../services/feedActions';
import { TOrderResponse } from '@api';

export type TFeed = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

const initialState: TFeed = {
  orders: [],
  total: 0,
  totalToday: 0
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getFeedOrders: (state) => state.orders,
    getTotal: (state) => state.total,
    getTotalToday: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedsApiThunk.pending, (state) => {
        state.orders = [];
        state.total = 0;
        state.totalToday = 0;
      })
      .addCase(getFeedsApiThunk.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getFeedsApiThunk.rejected, (state) => {
        state.orders = [];
        state.total = 0;
        state.totalToday = 0;
      })
      .addCase(getOrdersApiThunk.pending, (state) => {
        state.orders = [];
      })
      .addCase(getOrdersApiThunk.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(getOrdersApiThunk.rejected, (state) => {
        state.orders = [];
      });
  }
});

export const { getFeedOrders, getTotal, getTotalToday } = feedSlice.selectors;
