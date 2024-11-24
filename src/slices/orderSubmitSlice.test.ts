import { orderBurgerApiThunk } from '../services/orderSubmitActions';
import { orderSubmitSlice, TOrderItems } from './orderSubmitSlice';
import { TNewOrderResponse } from '@api';
import { TOrder } from '@utils-types';

describe('Тест orderSubmitSlice', () => {
  const initialState: TOrderItems = {
    orderRequest: false,
    orderModalData: null
  };

  const items: string[] = [
    '643d69a5c3f7b9001cfa093d',
    '643d69a5c3f7b9001cfa093e',
    '643d69a5c3f7b9001cfa093d'
  ];

  it('Тест orderSubmitSlice pending: установка orderRequest в true', () => {
    const actualState = orderSubmitSlice.reducer(
      {
        ...initialState,
        orderRequest: true
      },
      orderBurgerApiThunk.pending('', items)
    );

    const expectedState = {
      orderRequest: true,
      orderModalData: null
    };

    // и сравниваем их с ожидаемым результатом
    expect(actualState).toEqual(expectedState);
  });

  it('Тест orderSubmitSlice fulfilled: установка orderRequest в false, заполнение состояния заказом', () => {
    const orderResponse: TOrder = {
      _id: '1',
      status: 'pending',
      name: 'Order',
      createdAt: '2024-11-23',
      updatedAt: '2024-11-23',
      number: 1,
      ingredients: [
        'Флюоресцентная булка R2-D3',
        'Филе Люминесцентного тетраодонтимформа',
        'Флюоресцентная булка R2-D3'
      ]
    };
    const orderSubmitResponse: TNewOrderResponse = {
      success: true,
      order: orderResponse,
      name: ''
    };

    const expectedState = {
      orderRequest: false,
      orderModalData: orderSubmitResponse.order
    };

    const actualState = orderSubmitSlice.reducer(
      {
        ...initialState,
        orderModalData: orderSubmitResponse.order,
        orderRequest: false
      },
      orderBurgerApiThunk.fulfilled(orderSubmitResponse, '', items)
    );

    expect(actualState).toEqual(expectedState);
  });

  it('Тест orderSubmitSlice rejected: установка orderRequest в false', () => {
    const error = new Error('Test error');
    const expectedState = {
      orderRequest: false,
      orderModalData: null
    };

    const actualState = orderSubmitSlice.reducer(
      {
        ...initialState,
        orderModalData: null,
        orderRequest: false
      },
      orderBurgerApiThunk.rejected(error, '', items)
    );

    expect(actualState).toEqual(expectedState);
  });
});
