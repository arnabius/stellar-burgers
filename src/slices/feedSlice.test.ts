import { getFeedsApiThunk, getOrdersApiThunk } from '../services/feedActions';
import { feedSlice, TFeed } from './feedSlice';
import { TFeedsResponse } from '@api';
import { TOrder } from '@utils-types';

describe('Тест feedSlice: лента заказов', () => {
  const initialState: TFeed = {
    orders: [],
    total: 0,
    totalToday: 0
  };

  it('Тест feed pending', () => {
    const actualState = feedSlice.reducer(
      { ...initialState },
      getFeedsApiThunk.pending('')
    );

    const expectedState = {
      orders: [],
      total: 0,
      totalToday: 0
    };

    // и сравниваем их с ожидаемым результатом
    expect(actualState).toEqual(expectedState);
  });

  it('Тест feed fulfilled: заполнение состояния заказами, заполнение total и totalToday', () => {
    const orders: TOrder[] = [
      {
        _id: '1',
        status: 'pending',
        name: 'Order',
        createdAt: '2024-11-23',
        updatedAt: '2024-11-23',
        number: 1,
        ingredients: [
          'Биокотлета из марсианской Магнолии',
          'Филе Люминесцентного тетраодонтимформа'
        ]
      }
    ];
    const total = 1;
    const totalToday = 1;

    const feedsResponse: TFeedsResponse = {
      success: true,
      orders,
      total,
      totalToday
    };

    const expectedState = {
      orders,
      total,
      totalToday
    };

    const actualState = feedSlice.reducer(
      { ...initialState },
      getFeedsApiThunk.fulfilled(feedsResponse, '')
    );

    expect(actualState).toEqual(expectedState);
  });

  it('Тест feed rejected', () => {
    const error = new Error('Test error');
    const actualState = feedSlice.reducer(
      { ...initialState },
      getFeedsApiThunk.rejected(error, '')
    );

    const expectedState = {
      orders: [],
      total: 0,
      totalToday: 0
    };

    // и сравниваем их с ожидаемым результатом
    expect(actualState).toEqual(expectedState);
  });
});

describe('Тест feedSlice: заказы пользователя', () => {
  const initialState: TFeed = {
    orders: [],
    total: 0,
    totalToday: 0
  };

  it('Тест заказы пользователя pending', () => {
    const actualState = feedSlice.reducer(
      { ...initialState },
      getOrdersApiThunk.pending('')
    );

    const expectedState = {
      orders: [],
      total: 0,
      totalToday: 0
    };

    // и сравниваем их с ожидаемым результатом
    expect(actualState).toEqual(expectedState);
  });

  it('Тест заказы пользователя fulfilled: заполнение состояния заказами, заполнение total и totalToday', () => {
    const orders: TOrder[] = [
      {
        _id: '1',
        status: 'pending',
        name: 'Order',
        createdAt: '2024-11-23',
        updatedAt: '2024-11-23',
        number: 1,
        ingredients: [
          'Биокотлета из марсианской Магнолии',
          'Филе Люминесцентного тетраодонтимформа'
        ]
      }
    ];
    const total = 0;
    const totalToday = 0;

    const feedsResponse: TFeedsResponse = {
      success: true,
      orders,
      total,
      totalToday
    };

    const expectedState = {
      orders,
      total,
      totalToday
    };

    const actualState = feedSlice.reducer(
      { ...initialState },
      getOrdersApiThunk.fulfilled(feedsResponse.orders, '')
    );

    expect(actualState).toEqual(expectedState);
  });

  it('Тест заказы пользователя rejected', () => {
    const error = new Error('Test error');
    const actualState = feedSlice.reducer(
      { ...initialState },
      getOrdersApiThunk.rejected(error, '')
    );

    const expectedState = {
      orders: [],
      total: 0,
      totalToday: 0
    };

    // и сравниваем их с ожидаемым результатом
    expect(actualState).toEqual(expectedState);
  });
});
