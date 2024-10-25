import { TRegisterData, TLoginData } from '@api';
import { TUser } from '@utils-types';
export const registerUserData: TRegisterData = {
  email: 'aaaaa@yandex.ru',
  name: 'aaaaa',
  password: '123456789'
};

export const userData: TUser = {
  email: 'aaaaa@yandex.ru',
  name: 'aaaaa'
};

export const loginUserData: TLoginData = {
  email: 'aaaaa@yandex.ru',
  password: '123456789'
};

export const changedUserData: TUser = {
  email: 'aaaaa@yandex.ru',
  name: 'bbbbb'
};
