import { FC, useMemo } from 'react';
import { TConstructorIngredient, TConstructorItems } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  getConstructorItems,
  getOrderRequest,
  createOrder,
  getCurrentOrder,
  resetCurrentOrder,
  getIsAuthenticated
} from '@slices';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(getConstructorItems);
  const orderRequest = useSelector(getOrderRequest);
  const dispatch = useDispatch();
  const isAuth = useSelector(getIsAuthenticated);
  const navigate = useNavigate();
  const orderModalData = useSelector(getCurrentOrder);

  const onOrderClick = () => {
    if (!constructorItems?.bun || orderRequest) return;
    if (!isAuth) {
      navigate('/login', { replace: true });
      return;
    }
    const data = constructorItems.ingredients.map((el) => el._id);
    data.unshift(constructorItems.bun._id);
    data.push(constructorItems.bun._id);
    dispatch(createOrder(data));
  };
  const closeOrderModal = () => {
    dispatch(resetCurrentOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  // return null;

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
