import { ingredientsSlice, TIngredients } from './ingredientsSlice';
import { getIngredientsThunk } from '../services/ingredientsActions';

describe('Тест ingredientSlice', () => {
  const initialState: TIngredients = {
    ingredients: [],
    buns: [],
    mains: [],
    sauces: [],
    isIngredientsLoading: false
  };

  it('Тест pending: установка isLoading в true', () => {
    const actualState = ingredientsSlice.reducer(
      {
        ...initialState,
        isIngredientsLoading: true
      },
      getIngredientsThunk.pending('')
    );

    const expectedState = {
      ingredients: [],
      buns: [],
      mains: [],
      sauces: [],
      isIngredientsLoading: true
    };

    // и сравниваем их с ожидаемым результатом
    expect(actualState).toEqual(expectedState);
  });

  it('Тест fulfilled: заполнение состояния ингредиентами', () => {
    const ingredients = [
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      },
      {
        _id: '643d69a5c3f7b9001cfa093e',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
      }
    ];

    const ingredientsResponse = {
      success: true,
      data: ingredients
    };

    const expectedState = {
      ingredients: ingredientsResponse.data,
      buns: [],
      mains: ingredientsResponse.data,
      sauces: [],
      isIngredientsLoading: false
    };

    const actualState = ingredientsSlice.reducer(
      {
        ...initialState,
        mains: ingredientsResponse.data,
        ingredients: ingredientsResponse.data,
        isIngredientsLoading: false
      },
      getIngredientsThunk.fulfilled(ingredientsResponse.data, '')
    );

    expect(actualState).toEqual(expectedState);
  });

  it('Тест rejected: установка isLoading в false', () => {
    const error = new Error('Test error');
    const expectedState: TIngredients = {
      ingredients: [],
      buns: [],
      mains: [],
      sauces: [],
      isIngredientsLoading: false
    };

    const actualState = ingredientsSlice.reducer(
      {
        ...initialState,
        isIngredientsLoading: false
      },
      getIngredientsThunk.rejected(error, '')
    );

    expect(actualState).toEqual(expectedState);
  });
});
