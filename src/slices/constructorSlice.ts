import { TConstructorIngredient, TIngredient } from '@utils-types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TConstructorItems = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
  items: string[];
};

const initialState: TConstructorItems = {
  bun: null,
  ingredients: [],
  items: []
};

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addBun: (state, action: PayloadAction<TIngredient>) => {
      state.bun = action.payload;
    },
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.ingredients.push(action.payload);
    },
    setIngredients: (
      state,
      action: PayloadAction<TConstructorIngredient[]>
    ) => {
      state.ingredients = action.payload;
    },
    deleteIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients = state.ingredients.filter(
        (x) => x.id !== action.payload.id
      );
    },
    addItem: (state, action: PayloadAction<TIngredient>) => {
      state.items.push(action.payload._id);
    },
    clearConstructorItems: (state) => {
      state.items = [];
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    getBun: (state) => state.bun,
    getIngredients: (state) => state.ingredients,
    getConstructorItems: (state) => state,
    getItems: (state) => state.items
  }
});

export const {
  setIngredients,
  addBun,
  addIngredient,
  clearConstructorItems,
  deleteIngredient,
  addItem
} = constructorSlice.actions;

export const { getBun, getIngredients, getConstructorItems, getItems } =
  constructorSlice.selectors;
