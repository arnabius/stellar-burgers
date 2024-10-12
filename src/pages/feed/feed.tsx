import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeedOrders } from '../../slices/feedSlice';
import { getFeedsApiThunk } from '../../services/feedActions';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders = useSelector(getFeedOrders);

  const handleGetFeeds = () => {
    dispatch(getFeedsApiThunk())
      .unwrap()
      .catch(({ message }) => alert(message));
  };

  useEffect(() => {
    handleGetFeeds();
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
