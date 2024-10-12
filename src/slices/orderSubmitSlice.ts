import { createSlice } from '@reduxjs/toolkit';
import { orderBurgerApiThunk } from '../services/orderSubmitActions';
import { TOrder } from '@utils-types';

export type TOrderItems = {
  orderRequest: boolean;
  orderModalData: TOrder | null;
};

const initialState: TOrderItems = {
  orderRequest: false,
  orderModalData: null
};

export const orderSubmitSlice = createSlice({
  name: 'orderSubmit',
  initialState,
  reducers: {
    clearOrderModalData: (state) => {
      state.orderModalData = null;
    }
  },
  selectors: {
    getOrderRequest: (state) => state.orderRequest,
    getOrderModalData: (state) => state.orderModalData
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurgerApiThunk.pending, (state) => {
        state.orderModalData = null;
        state.orderRequest = true;
      })
      .addCase(orderBurgerApiThunk.fulfilled, (state, action) => {
        state.orderModalData = action.payload.order;
        state.orderRequest = false;
      })
      .addCase(orderBurgerApiThunk.rejected, (state) => {
        state.orderModalData = null;
        state.orderRequest = false;
      });
  }
});

export const { clearOrderModalData } = orderSubmitSlice.actions;
export const { getOrderRequest, getOrderModalData } =
  orderSubmitSlice.selectors;
