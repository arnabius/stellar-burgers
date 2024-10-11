import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getFeedOrders } from '../../slices/feedSlice';
import { AppDispatch, useDispatch } from '../../services/store';
import { getOrdersApiThunk } from '../../services/feedActions';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getFeedOrders);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersApiThunk())
      .unwrap()
      .catch(({ message }) => alert(message));
  }, []);

  if (!orders) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
