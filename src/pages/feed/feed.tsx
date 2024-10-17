import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeeds, getOrders, getOrdersFromStore } from '@slices';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFeeds());
    // dispatch(getOrders());
  }, []);
  const orders: TOrder[] = useSelector(getOrdersFromStore);
  if (!orders.length) {
    return <Preloader />;
  }
  return (
    <>
      {!orders.length ? (
        <Preloader />
      ) : (
        <FeedUI
          orders={orders}
          handleGetFeeds={() => {
            dispatch(getFeeds());
          }}
        />
      )}
    </>
  );
};
