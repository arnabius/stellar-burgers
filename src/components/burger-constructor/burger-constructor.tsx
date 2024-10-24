import { FC, useMemo, useState } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearConstructorItems,
  getConstructorItems
} from '../../slices/constructorSlice';
import {
  clearOrderModalData,
  getOrderModalData,
  getOrderRequest
} from '../../slices/orderSubmitSlice';
import { orderBurgerApiThunk } from '../../services/orderSubmitActions';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../slices/userSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(getConstructorItems);
  const orderRequest = useSelector(getOrderRequest);
  const orderModalData = useSelector(getOrderModalData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUser);

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) {
      navigate('/login');
      return;
    }

    const orderItems = constructorItems.items;

    let items: string[] = [];
    items = items.concat(
      constructorItems.bun._id,
      orderItems,
      constructorItems.bun._id
    );

    dispatch(orderBurgerApiThunk(items));
  };

  const closeOrderModal = () => {
    dispatch(clearOrderModalData());
    dispatch(clearConstructorItems());

    navigate('/');
  };

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
