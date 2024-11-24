import { orderSlice, TOrders } from './orderSlice';
import { getOrderByNumberApiThunk } from '../services/orderActions';
import { TOrderResponse } from '@api';

describe('Тест orderSlice', () => {
  const initialState: TOrders = {
    orders: []
  };

  it('Тест orderSlice pending', () => {
    const actualState = orderSlice.reducer(
      {
        ...initialState
      },
      getOrderByNumberApiThunk.pending('1', 0)
    );

    const expectedState = {
      orders: []
    };

    // и сравниваем их с ожидаемым результатом
    expect(actualState).toEqual(expectedState);
  });

  it('Тест orderSlice fulfilled: заполнение состояния заказом', () => {
    const order = [
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

    const orderResponse: TOrderResponse = {
      success: true,
      orders: order
    };

    const expectedState = {
      orders: orderResponse.orders
    };

    const actualState = orderSlice.reducer(
      {
        ...initialState,
        orders: orderResponse.orders
      },
      getOrderByNumberApiThunk.fulfilled(orderResponse, '1', 0)
    );

    expect(actualState).toEqual(expectedState);
  });

  it('Тест orderSlice rejected', () => {
    const error = new Error('Test error');
    const expectedState: TOrders = {
      orders: []
    };

    const actualState = orderSlice.reducer(
      {
        ...initialState
      },
      getOrderByNumberApiThunk.rejected(error, '1', 0)
    );

    expect(actualState).toEqual(expectedState);
  });
});
