import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch, useSelector } from '../../services/store';
import {
  deleteIngredient,
  getIngredients,
  setIngredients
} from '../../slices/constructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    const ingredients = useSelector(getIngredients);

    const handleMoveDown = () => {
      const elemToMove = ingredients[index];

      const newIngredients = ingredients
        .toSpliced(index, 1)
        .toSpliced(index + 1, 0, elemToMove);
      dispatch(setIngredients(newIngredients));
    };

    const handleMoveUp = () => {
      const elemToMove = ingredients[index];

      const newIngredients = ingredients
        .toSpliced(index, 1)
        .toSpliced(index - 1, 0, elemToMove);
      dispatch(setIngredients(newIngredients));
    };

    const handleClose = () => {
      dispatch(deleteIngredient(ingredient));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
