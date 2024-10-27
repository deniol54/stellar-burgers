import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginUserApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  getUserApi,
  updateUserApi,
  logoutApi
} from '@api';
import { setCookie, deleteCookie } from '../../utils/cookie';
import { TUser } from '@utils-types';

export type UserState = {
  user: TUser;
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  loginUserRequest: boolean;
};

const initialState: UserState = {
  user: { email: '', name: '' },
  isAuthChecked: false,
  isAuthenticated: false,
  loginUserRequest: false
};

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => {
    const ans = await registerUserApi(data);
    setCookie('accessToken', ans.accessToken);
    localStorage.setItem('refreshToken', ans.refreshToken);
    return ans.user;
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => {
    const ans = await loginUserApi(data);
    setCookie('accessToken', ans.accessToken);
    localStorage.setItem('refreshToken', ans.refreshToken);
    return ans.user;
  }
);

export const getUser = createAsyncThunk('user/getUser', async () =>
  getUserApi()
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (data: Partial<TRegisterData>) => updateUserApi(data)
);

export const logout = createAsyncThunk('user/logout', async () =>
  logoutApi()
    .then(() => {
      localStorage.clear(); // очищаем refreshToken
      deleteCookie('accessToken'); // очищаем accessToken
    })
    .catch(() => {
      console.log('Ошибка выполнения выхода');
    })
);

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {},
  selectors: {
    getUserName: (state) => state.user?.name,

    getUserInfo: (state) => state.user,

    getIsAuthenticated: (state) => state.isAuthenticated
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loginUserRequest = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.isAuthChecked = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })

      .addCase(loginUser.pending, (state) => {
        state.loginUserRequest = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.isAuthChecked = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })

      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })

      .addCase(logout.fulfilled, (state, action) => {
        state.user = { email: '', name: '' };
        state.isAuthenticated = false;
        state.isAuthChecked = false;
      });
  }
});

// export const { updateTicker } = shopSlice.actions;
export const userReducer = userSlice.reducer;
export {initialState as userInitialState};
export const { getUserName, getUserInfo, getIsAuthenticated } =
  userSlice.selectors;
