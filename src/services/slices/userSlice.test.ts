import { expect, test, describe } from '@jest/globals';
import { UserState } from './userSlice';
import {
  userReducer,
  registerUser,
  loginUser,
  getUser,
  updateUser,
  logout,
  userInitialState
} from './userSlice';
import {
  registerUserData,
  userData,
  loginUserData,
  changedUserData
} from 'src/test-data/user';

describe('тесты редьюсеров слайса для работы с пользователем', () => {
  test('регистрация пользователя(pending)', () => {
    const expectedState = { ...userInitialState, loginUserRequest: true };
    const actualState = userReducer(
      userInitialState,
      registerUser.pending('', registerUserData)
    );
    expect(actualState).toEqual(expectedState);
  });

  test('регистрация пользователя(rejected)', () => {
    const expectedState = { ...userInitialState, loginUserRequest: false };
    const actualState = userReducer(
      userInitialState,
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
      userInitialState,
      registerUser.fulfilled(userData, '', registerUserData)
    );
    expect(actualState).toEqual(expectedState);
  });

  test('вход пользователя(pending)', () => {
    const expectedState = { ...userInitialState, loginUserRequest: true };
    const actualState = userReducer(
      userInitialState,
      loginUser.pending('', loginUserData)
    );
    expect(actualState).toEqual(expectedState);
  });

  test('вход пользователя(rejected)', () => {
    const expectedState = { ...userInitialState, loginUserRequest: false };
    const actualState = userReducer(
      userInitialState,
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
      userInitialState,
      loginUser.fulfilled(userData, '', loginUserData)
    );
    expect(actualState).toEqual(expectedState);
  });

  test('авторизация пользователя(fulfilled)', () => {
    const expectedState = {
      ...userInitialState,
      isAuthenticated: true,
      isAuthChecked: true,
      user: userData
    };
    const actualState = userReducer(
      userInitialState,
      getUser.fulfilled({ success: true, user: userData }, '')
    );
    expect(actualState).toEqual(expectedState);
  });

  test('изменение данных пользователя(fulfilled)', () => {
    const currentState = {
      ...userInitialState,
      user: userData
    };
    const expectedState = {
      ...userInitialState,
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
      ...userInitialState,
      user: userData,
      isAuthenticated: true,
      isAuthChecked: true
    };
    const actualState = userReducer(currentState, logout.fulfilled(void 0, ''));
    expect(actualState).toEqual(userInitialState);
  });
});
