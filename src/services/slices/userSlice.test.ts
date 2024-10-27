import { expect, test, describe } from '@jest/globals';
import { UserState } from './userSlice';
import {
  userReducer,
  registerUser,
  loginUser,
  getUser,
  updateUser,
  logout
} from './userSlice';
import {
  registerUserData,
  userData,
  loginUserData,
  changedUserData
} from 'src/test-data/user';

describe('тесты редьюсеров слайса для работы с пользователем', () => {
  const initialState: UserState = {
    user: { email: '', name: '' },
    isAuthChecked: false,
    isAuthenticated: false,
    loginUserRequest: false
  };

  test('регистрация пользователя(pending)', () => {
    const expectedState = { ...initialState, loginUserRequest: true };
    const actualState = userReducer(
      initialState,
      registerUser.pending('', registerUserData)
    );
    expect(actualState).toEqual(expectedState);
  });

  test('регистрация пользователя(rejected)', () => {
    const expectedState = { ...initialState, loginUserRequest: false };
    const actualState = userReducer(
      initialState,
      registerUser.rejected(new Error(), '', registerUserData)
    );
    expect(actualState).toEqual(expectedState);
  });

  test('регистрация пользователя(fulfilled)', () => {
    const expectedState = {
      loginUserRequest: false,
      isAuthenticated: true,
      isAuthChecked: true,
      user: userData
    };
    const actualState = userReducer(
      initialState,
      registerUser.fulfilled(userData, '', registerUserData)
    );
    expect(actualState).toEqual(expectedState);
  });

  test('вход пользователя(pending)', () => {
    const expectedState = { ...initialState, loginUserRequest: true };
    const actualState = userReducer(
      initialState,
      loginUser.pending('', loginUserData)
    );
    expect(actualState).toEqual(expectedState);
  });

  test('вход пользователя(rejected)', () => {
    const expectedState = { ...initialState, loginUserRequest: false };
    const actualState = userReducer(
      initialState,
      loginUser.rejected(new Error(), '', loginUserData)
    );
    expect(actualState).toEqual(expectedState);
  });

  test('вход пользователя(fulfilled)', () => {
    const expectedState = {
      loginUserRequest: false,
      isAuthenticated: true,
      isAuthChecked: true,
      user: userData
    };
    const actualState = userReducer(
      initialState,
      loginUser.fulfilled(userData, '', loginUserData)
    );
    expect(actualState).toEqual(expectedState);
  });

  test('авторизация пользователя(fulfilled)', () => {
    const expectedState = {
      ...initialState,
      isAuthenticated: true,
      isAuthChecked: true,
      user: userData
    };
    const actualState = userReducer(
      initialState,
      getUser.fulfilled({ success: true, user: userData }, '')
    );
    expect(actualState).toEqual(expectedState);
  });

  test('изменение данных пользователя(fulfilled)', () => {
    const currentState = {
      ...initialState,
      user: userData
    };
    const expectedState = {
      ...initialState,
      user: changedUserData
    };
    const actualState = userReducer(
      currentState,
      updateUser.fulfilled({ user: changedUserData, success: true }, '', {
        name: changedUserData.name
      })
    );
    expect(actualState).toEqual(expectedState);
  });

  test('выход пользователя(fulfilled)', () => {
    const currentState = {
      ...initialState,
      user: userData,
      isAuthenticated: true,
      isAuthChecked: true
    };
    const actualState = userReducer(currentState, logout.fulfilled(void 0, ''));
    expect(actualState).toEqual(initialState);
  });
});
