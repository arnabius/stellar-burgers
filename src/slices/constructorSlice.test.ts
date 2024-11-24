import { TConstructorIngredient, TIngredient } from '@utils-types';
import {
  addIngredient,
  deleteIngredient,
  setIngredients,
  TConstructorItems
} from './constructorSlice';

describe('constructorSlice tests', () => {
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

  const stateBeforeMove: TConstructorItems = {
    bun: null,
    ingredients: [
      {
        id: '111',
        _id: '643d69a5c3f7b9001cfa0943',
        name: 'Соус фирменный Space Sauce',
        type: 'sauce',
        proteins: 50,
        fat: 22,
        carbohydrates: 11,
        calories: 14,
        price: 80,
        image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png'
      },
      {
        id: '222',
        _id: '643d69a5c3f7b9001cfa093f',
        name: 'Мясо бессмертных моллюсков Protostomia',
        type: 'main',
        proteins: 433,
        fat: 244,
        carbohydrates: 33,
        calories: 420,
        price: 1337,
        image: 'https://code.s3.yandex.net/react/code/meat-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png'
      },
      {
        id: '333',
        _id: '643d69a5c3f7b9001cfa0940',
        name: 'Говяжий метеорит (отбивная)',
        type: 'main',
        proteins: 800,
        fat: 800,
        carbohydrates: 300,
        calories: 2674,
        price: 3000,
        image: 'https://code.s3.yandex.net/react/code/meat-04.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png'
      }
    ],
    items: []
  };

  test('Тест добавления ингредиента', () => {
    const newState = addIngredient(ingredientToManipulate).payload;

    expect(newState).toEqual(stateAfterAdd.ingredients[0]);
  });

  test('Тест удаления ингредиента', () => {
    const newState = deleteIngredient(ingredientToManipulate);

    expect(newState.payload).toEqual(ingredientToManipulate);
  });

  test('Тест изменения порядка ингредиентов в начинке', () => {
    const newIngredients = setIngredients(stateBeforeMove.ingredients);

    expect(newIngredients.payload).toEqual(stateBeforeMove.ingredients);
  });
});
