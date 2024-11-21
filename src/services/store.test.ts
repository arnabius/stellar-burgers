import store, { rootReducer } from './store';
import { userSlice } from '../slices/userSlice';
import { constructorSlice } from '../slices/constructorSlice';
import { ingredientsSlice } from '../slices/ingredientsSlice';
import { orderSubmitSlice } from '../slices/orderSubmitSlice';
import { feedSlice } from '../slices/feedSlice';
import { orderSlice } from '../slices/orderSlice';

describe('rootReducer initiate', () => {
  /*
  test('should initiate correctly, and return the initial state', () => {
    const initAction = { type: '@@INIT' };
    const state = rootReducer(undefined, initAction);
    expect(state).toEqual({
      userSlice,
      constructorSlice, //+
      ingredientsSlice, //+
      orderSubmitSlice, //+
      feedSlice, //+
      orderSlice //+
    });
  });
  */

  it('rootReducer initializes the state correctly', () => {
    const initAction = { type: '@@INIT' };
    const initialState = store.getState();
    const state = rootReducer(undefined, initAction);
    expect(state).toEqual(initialState);
  });
});
