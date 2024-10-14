import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsApi, getFeedsApi } from '@api';
import { TConstructorItems, TIngredient, TOrder } from '@utils-types';

export const getIngredients = createAsyncThunk('shop/getIngid', async () =>
  getIngredientsApi()
);

export const getFeeds = createAsyncThunk('shop/getFeeds', async () =>
  getFeedsApi()
);

type ShopStore = {
  ingridients: TIngredient[];
  isIngredientsLoading: boolean;
  isOrdersLoading: boolean;
  orders: TOrder[];
  totalOrders: number;
  totalToday: number;
  constructorItems: TConstructorItems;
};

const initialState: ShopStore = {
  ingridients: [],
  isIngredientsLoading: true,
  isOrdersLoading: true,
  orders: [],
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
    }
  },
  selectors: {
    getIsIngredientsLoading: (state) => state.isIngredientsLoading,

    getIngredientsFromStore: (state) => state.ingridients,

    getOrdersFromStore: (state) => state.orders,

    getConstructorItems: (state) => state.constructorItems,

    getFeed: (state) => ({
      total: state.totalOrders,
      totalToday: state.totalToday
    })
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
        state.isOrdersLoading = true;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.isOrdersLoading = false;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.isOrdersLoading = false;
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  }
});

export const { addItem, removeItem, upItem, downItem } = shopSlice.actions;
export const shopReducer = shopSlice.reducer;

export const {
  getIsIngredientsLoading,
  getIngredientsFromStore,
  getOrdersFromStore,
  getFeed,
  getConstructorItems
} = shopSlice.selectors;
