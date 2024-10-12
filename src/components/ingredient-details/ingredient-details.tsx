import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { AppDispatch, useDispatch, useSelector } from '../../services/store';
//import { getIngredient } from '../../slices/ingredientsSlice';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch: AppDispatch = useDispatch();
  //const ingredientData = useSelector(getIngredient);

  const { id } = useParams();
  const ingredientData = useSelector((state) => {
    let ingredient = state.ingredient.ingredients.find(
      (ingredient) => ingredient._id === id!
    );
    if (ingredient) {
      return ingredient;
    }

    return null;
  });

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
