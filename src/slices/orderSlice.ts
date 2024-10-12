import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrderByNumberApiThunk } from '../services/orderActions';

export type TOrders = {
  orders: TOrder[];
};

const initialState: TOrders = {
  orders: []
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    getOrders: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumberApiThunk.pending, (state) => {
        state.orders = [];
      })
      .addCase(getOrderByNumberApiThunk.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
      })
      .addCase(getOrderByNumberApiThunk.rejected, (state) => {
        state.orders = [];
      });
  }
});

export const { getOrders } = orderSlice.selectors;
