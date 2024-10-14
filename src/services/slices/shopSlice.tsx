import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createSelector
} from '@reduxjs/toolkit';
import {
  getIngredientsApi,
  getFeedsApi,
  orderBurgerApi,
  getOrdersApi
} from '@api';
import { TConstructorItems, TIngredient, TOrder } from '@utils-types';

export const getIngredients = createAsyncThunk('shop/getIngid', async () =>
  getIngredientsApi()
);

export const getFeeds = createAsyncThunk('shop/getFeeds', async () =>
  getFeedsApi()
);

export const createOrder = createAsyncThunk(
  'shop/createOrder',
  async (data: string[]) => orderBurgerApi(data)
);

export const getOrders = createAsyncThunk('shop/getOrders', async () =>
  getOrdersApi()
);

type ShopStore = {
  ingridients: TIngredient[];
  isIngredientsLoading: boolean;
  isOrdersLoading: boolean;
  isFeedsLoading: boolean;
  orders: TOrder[];
  totalOrders: number;
  currentOrder: TOrder | null;
  orderRequest: boolean;
  totalToday: number;
  constructorItems: TConstructorItems;
};

const initialState: ShopStore = {
  ingridients: [],
  isIngredientsLoading: false,
  isOrdersLoading: false,
  isFeedsLoading: false,
  orders: [],
  currentOrder: null,
  orderRequest: false,
  totalOrders: 0,
  totalToday: 0,
  constructorItems: {
    ingredients: []
  }
};

const shopSlice = createSlice({
  name: 'shopSlice',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<TIngredient>) => {
      if (action.payload.type === 'bun')
        state.constructorItems.bun = action.payload;
      else
        state.constructorItems.ingredients.push({
          ...action.payload,
          id: state.constructorItems.ingredients.length.toString()
        });
    },
    removeItem: (state, action: PayloadAction<TIngredient>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (i) => i._id !== action.payload._id
        );
    },
    upItem: (state, action: PayloadAction<number>) => {
      [
        state.constructorItems.ingredients[action.payload],
        state.constructorItems.ingredients[action.payload - 1]
      ] = [
        state.constructorItems.ingredients[action.payload - 1],
        state.constructorItems.ingredients[action.payload]
      ];
    },
    downItem: (state, action: PayloadAction<number>) => {
      [
        state.constructorItems.ingredients[action.payload],
        state.constructorItems.ingredients[action.payload + 1]
      ] = [
        state.constructorItems.ingredients[action.payload + 1],
        state.constructorItems.ingredients[action.payload]
      ];
    },
    resetCurrentOrder: (state) => {
      state.currentOrder = null;
      state.constructorItems.ingredients = [];
      state.constructorItems.bun = undefined;
    }
  },
  selectors: {
    getIsIngredientsLoading: (state) => state.isIngredientsLoading,

    getIngredientsFromStore: (state) => state.ingridients,

    getOrdersFromStore: (state) => state.orders,

    getConstructorItems: (state) => state.constructorItems,

    getOrderRequest: (state) => state.orderRequest,

    getCurrentOrder: (state) => state.currentOrder,

    getTotal: (state) => state.totalOrders,

    getTotalToday: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isIngredientsLoading = false;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isIngredientsLoading = false;
        state.ingridients = action.payload;
      })

      .addCase(getFeeds.pending, (state) => {
        state.isFeedsLoading = true;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.isFeedsLoading = false;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.isFeedsLoading = false;
        state.totalOrders = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })

      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.currentOrder = action.payload.order;
      })

      .addCase(getOrders.pending, (state) => {
        state.isOrdersLoading = true;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isOrdersLoading = false;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isOrdersLoading = false;
        state.orders = action.payload;
      });
  }
});

export const { addItem, removeItem, upItem, downItem, resetCurrentOrder } =
  shopSlice.actions;
export const shopReducer = shopSlice.reducer;

export const {
  getIsIngredientsLoading,
  getIngredientsFromStore,
  getOrdersFromStore,
  getConstructorItems,
  getOrderRequest,
  getTotal,
  getTotalToday,
  getCurrentOrder
} = shopSlice.selectors;

export const feeds = createSelector(
  [getTotal, getTotalToday],
  (total, totalToday) => ({
    total,
    totalToday
  })
);
