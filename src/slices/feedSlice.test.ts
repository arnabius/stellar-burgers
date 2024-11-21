/*describe('feedSlice', () => {
  const initialState: TFeedState = {
    orders: [],
    total: 0,
    totalToday: 0,
    error: null,
    isLoading: false
  };

  it('should set isLoading to true and reset error to null when pending is dispatched', () => {
    // проверяем актуальное состояние при помощи вызова функции-редюсера и предачи в него нач состояния и нашего экшена - вручную подключаем экшн без асинхронщины
    const actualState = feedReducer(
      {
        ...initialState,
        error: new Error('Test Error')
      },
      getFeeds.pending('')
    );

    expect(actualState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      error: null,
      isLoading: true
    }); // отдельно написать expected state
  });

  it('should update state with orders, total, and totalToday when fulfilled is dispatched', () => {
    const orders = [
      {
        _id: 1,
        status: 'pending',
        name: 'Order 1',
        createdAt: '2024-11-20',
        updatedAt: '2024-11-20',
        number: 1,
        ingredients: ['ingredient1', 'ingredient2']
      }
    ];
    const total = 1;
    const totalToday = 1;

    const feedsResponse = {
      success: true,
      orders,
      total,
      totalToday
    };

    const expectedState = {
      orders,
      total,
      totalToday,
      isLoading: false,
      error: null
    };

    const actualState = feedReducer(
      {
        ...initialState,
        isLoading: true
      },
      getFeeds.fulfilled(feedsResponse, '')
    );

    expect(actualstate).toEqual(expectedState);
  });

  it('should set error and isLoading to false when rejectred is dispatched', () => {
    const error = new Error('Test Error');
    const expectedState: TFeedState = {
      orders: [],
      total: 0,
      totalToday: 0,
      error: {
        message: error.message
      },
      isLoading: false
    };

    const actualState = feedReducer()
  });
});
*/
