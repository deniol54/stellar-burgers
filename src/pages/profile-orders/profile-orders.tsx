import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { getOrders, getUserOrders } from '@slices';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getUserOrders);
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  return <ProfileOrdersUI orders={orders} />;
};
