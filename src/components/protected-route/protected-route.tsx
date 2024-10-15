import React from 'react';
import { FC } from 'react';
import { useSelector } from '../../services/store';
import { getUserInfo, getIsAuthenticated } from '@slices';
import { Preloader } from '@ui';
import { Navigate, useMatch } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactElement;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(getIsAuthenticated); // isAuthCheckedSelector — селектор получения состояния загрузки пользователя
  const user = useSelector(getUserInfo); // userDataSelector — селектор получения пользователя из store
  const loginMatch = useMatch('/login');
  const registerMatch = useMatch('/register');
  const forgotPasswordMatch = useMatch('/forgot-password');
  const changePasswordMatch = useMatch('/reset-password');

  if (
    loginMatch ||
    registerMatch ||
    forgotPasswordMatch ||
    changePasswordMatch
  ) {
    return children;
  }

  if (!isAuthChecked && !user.name) {
    // если пользователь на странице авторизации и данных в хранилище нет, то делаем редирект
    return <Navigate replace to='/login' />;
  }

  return children;
};
