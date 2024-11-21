import { TConstructorIngredient, TIngredient } from '@utils-types';
import {
  addIngredient,
  deleteIngredient,
  TConstructorItems
} from './constructorSlice';

describe('constructorSlice tests', () => {
  const initialState: TConstructorItems = {
    bun: null,
    ingredients: [],
    items: []
  };

  /*
  beforeEach(() => {
    jest.resetAllMocks();
    burgerConstructor.state = { ...inititalState };
  });

  // очищаем хранилище после каждого теста
  afterEach(() => {
    jest.resetAllMocks();
  });*/

  const ingredient: TIngredient = {
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
  };

  const ingredientToManipulate: TConstructorIngredient = {
    id: 'aaa',
    ...ingredient
  };

  const stateAfterAdd: TConstructorItems = {
    bun: null,
    ingredients: [ingredientToManipulate],
    items: []
  };

  /*
  test('test adding the ingredient', () => {
    const ingredientNew: TConstructorIngredient[] = [{ id: 'aaa', ...ingredientToAdd }];

    const state: TConstructorItems = {
        ingredients: {
        ...initialState.ingredients,
        ingredientNew
        }
    };
    

    const newState = addIngredient(ingredientToManipulate).payload;

    expect(newState).toEqual(stateAfterAdd.ingredients[0]);
  });
  */

  test('test deleting the ingredient', () => {
    /*
    const stateAfterDel: TConstructorItems = {
      bun: null,
      ingredients: [],
      items: []
    };
    */

    const stateAfterDel = {
      burgerConstructor: {
        ...stateAfterAdd,
        ingredients: []
      }
    };

    const newState = deleteIngredient(ingredientToManipulate);

    expect(newState).toEqual(
      ingredientToManipulate /*stateAfterDel.burgerConstructor.ingredients[0]*/
    );
    //expect(newState.payload).toHaveLength(0);
  });
  /*
   removeFromConstructor: (state, { payload }: PayloadAction<number>) => {
      state.ingredients.splice(payload, 1);
    },

  it('should handle removeFromConstructor action', () => {
    const initialState = {
      bun: null,
      ingredients: [ingredientToManipulate]
    };
    const newState = constructorReducer(initialState, removeFromConstructor(0));
    expect(newState.ingredients).toHaveLength(0);
  });
  */
});
