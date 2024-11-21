import { expect, test, describe } from '@jest/globals';
//import { data } from '../../data';
//import { api } from '../../utils/api';
/*import { getIngredients } from './actions';
import {
  allIngredients,
  initialState,
  reducer,
  sortIngredients,
  withoutBuns
} from './slice';
import { store } from '../store';*/
import { getBuns, ingredientsSlice, TIngredients } from '../slices/ingredientsSlice';
import { ingredientsData } from '../ingredientsData';
import { TIngredientsCategoryProps } from 'src/components/ingredients-category/type';
import { TIngredient } from '@utils-types';
//import { configureStore } from "@reduxjs/toolkit"; //'react-redux'; //"@reduxjs/toolkit";

// инициализируем пустое хранилище перед каждым тестом
/*beforeAll(() => {
    storage.init();
})

// очищаем хранилище после каждого теста
afterAll(() => {
    storage.clear();
})*/

describe('тест редюсера', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  /*
  // начальное состояние, которое будем менять в тестах
  const mockIngredients = [
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
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa0945',
      name: 'Соус с шипами Антарианского плоскоходца',
      type: 'sauce',
      proteins: 101,
      fat: 99,
      carbohydrates: 100,
      calories: 100,
      price: 88,
      image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png'
    }
  ];
  

  const sortedIngredients = [
    {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    },
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
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa0945',
      name: 'Соус с шипами Антарианского плоскоходца',
      type: 'sauce',
      proteins: 101,
      fat: 99,
      carbohydrates: 100,
      calories: 100,
      price: 88,
      image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png'
    }
  ];
  */

  const filteredIngredients: TIngredient[] = [
    {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa093d',
      name: 'Флюоресцентная булка R2-D3',
      type: 'bun',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/bun-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
    }
  ];

  /*const initialState = {
    ingredients: mockIngredients,
    isLoading: false
  };*/

  const initialState: TIngredients = {
    ingredients: ingredientsData,
    buns: [],
    mains: [],
    sauces: [],
    isIngredientsLoading: false
  };

  /*const sortedState = {
    ingredients: sortedIngredients,
    isLoading: false
  };*/

  const filteredState = {
    ingredients: filteredIngredients
  };
  /*
  test('тест сортировки ингредиентов', () => {
    // ставим лайк с помощью экшена toggleLike
    const newState = reducer(initialState, sortIngredients({ from: 1, to: 0 }));
    // достаем массив треков из состояния
    const { ingredients } = newState;

    // сравниваем то что получилось с sortedIngredients результатом
    expect(ingredients).toEqual(sortedState.ingredients);
  });
  */

   test('тест селектора булок getBuns', () => {
    const state = {
      ingredientSlice: {
        ...initialState,
        buns: filteredIngredients
      }
    };
    const bunState = getBuns(state);

    expect(bunState).toEqual(filteredState.ingredients);
  });

  /*// т.к. тестируем асинхронный код то пользуемся async/await
  test('тест загрузки ингредиентов', async () => {
    const state = {
      burgerConstructor: {
        ...initialState,
        ingredients: ingredientsData
      }
    };

    const getIngredientsSpy = jest
      .spyOn(api, 'getIngredients')
      .mockResolvedValue({ ingredients: data });

    // ожидаем завершение выполнение асинхронного экшена
    const ingredients = allIngredients(state);

    // и сравниваем их с ожидаемым результатом
    expect(ingredients).toEqual(data);
  });

  it('should update state with ingredients data and set isLoading to false when fulfilled is dispatched', () => {
    const testData = [
      {
        _id: '1',
        name: 'Ingredient 1',
        type: 'type1',
        proteins: 10,
        fat: 5,
        carbohydrates: 20,
        calories: 150,
        price: 1.5,
        image: 'image1',
        image_large: 'large1',
        image_mobile: 'mobile1'
      }
    ];

    const actualState = ingredientsSlice(
      {
        ...initialState,
        isLoading: true
      },
      getIngredients.fulfilled(testData, '')
    );

    expect(actualState).toEqual({
      data: testData,
      isLoading: false,
      error: null
    });
  });
  
  
  it('should set error and isLoading to false when getIngredientsFailed is dispatched', () => {
    const testError = new Error('Test Error');

    const expectedState: TIngredientsState = {
      data: [],
      isLoading: false,
      error: {
        message: testError.message
      }
    };

    const actualState = ingredientsReducer(
      {
        ...initialState,
        isLoading: true
      },
      getIngredients.rejected(testError, '')
    );

    expect(actualState).toMatchObject(expectedState);
  });*/
});
