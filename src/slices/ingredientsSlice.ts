import { TIngredient } from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';
import { getIngredientsThunk } from '../services/ingredientsActions';

type TIngredients = {
  ingredients: TIngredient[] | [];
  buns: TIngredient[] | [];
  mains: TIngredient[] | [];
  sauces: TIngredient[] | [];
  isIngredientsLoading: boolean;
};

const initialState: TIngredients = {
  ingredients: [],
  buns: [],
  mains: [],
  sauces: [],
  isIngredientsLoading: false
};

export const ingredientsSlice = createSlice({
  name: 'ingredient',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsLoading: (state) => state.isIngredientsLoading,
    getIngredients: (state) => state.ingredients,
    getBuns: (state) => state.buns,
    getMains: (state) => state.mains,
    getSauces: (state) => state.sauces
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsThunk.pending, (state) => {
        state.isIngredientsLoading = true;
      })
      .addCase(getIngredientsThunk.fulfilled, (state, action) => {
        state.isIngredientsLoading = false;
        state.ingredients = action.payload;
        state.buns = action.payload.filter((elem) => elem.type === 'bun');
        state.mains = action.payload.filter((elem) => elem.type === 'main');
        state.sauces = action.payload.filter((elem) => elem.type === 'sauce');
      })
      .addCase(getIngredientsThunk.rejected, (state) => {
        state.isIngredientsLoading = false;
        state.ingredients = [];
        state.buns = [];
        state.mains = [];
        state.sauces = [];
      });
  }
});

export const {
  getIngredientsLoading,
  getIngredients,
  getBuns,
  getMains,
  getSauces
} = ingredientsSlice.selectors;
