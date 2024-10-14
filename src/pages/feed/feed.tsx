import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector } from '../../services/store';
import { getOrdersFromStore } from '@slices';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getOrdersFromStore);
  if (!orders.length) {
    return <Preloader />;
  }
  return (
    <>
      {!orders.length ? (
        <Preloader />
      ) : (
        <FeedUI orders={orders} handleGetFeeds={() => {}} />
      )}
    </>
  );
};
