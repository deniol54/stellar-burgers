import { expect, test, jest, describe } from '@jest/globals';
import {
  shopReducer,
  addItem,
  ShopStore,
  removeItem,
  upItem,
  downItem,
  resetCurrentOrder,
  getIngredients,
  getFeeds,
  createOrder,
  getOrders
} from './shopSlice';
import { ingredientsData } from 'src/test-data/ingredients';
import { feedsData } from 'src/test-data/feeds';
import { orderData, orderResponseData } from 'src/test-data/order';
import store from '../store';

const ingredient1 = {
  id: '1',
  ...ingredientsData[1]
};

const ingredient2 = {
  id: '2',
  ...ingredientsData[2]
};

describe('тесты экшенов слайса для работы с ингридиентами', () => {
  const initialState: ShopStore = {
    ingridients: [],
    isIngredientsLoading: false,
    isOrdersLoading: false,
    isFeedsLoading: false,
    orders: [],
    userOrders: [],
    currentOrder: null,
    orderRequest: false,
    totalOrders: 0,
    totalToday: 0,
    constructorItems: {
      ingredients: [ingredient1, ingredient2]
    }
  };

  test('добавить ингридиент в заказ', () => {
    const newState = shopReducer(initialState, addItem(ingredientsData[3]));
    const { constructorItems } = newState;
    expect(constructorItems.ingredients.length).toEqual(3);
    const {
      _id,
      name,
      type,
      proteins,
      fat,
      carbohydrates,
      calories,
      price,
      image,
      image_large,
      image_mobile
    } = constructorItems.ingredients[2];
    const item = {
      _id,
      name,
      type,
      proteins,
      fat,
      carbohydrates,
      calories,
      price,
      image,
      image_large,
      image_mobile
    };

    expect(item).toEqual(ingredientsData[3]);
  });

  test('удалить ингридиент из заказа', () => {
    const newState = shopReducer(initialState, removeItem(ingredientsData[1]));
    const { constructorItems } = newState;
    expect(constructorItems.ingredients.length).toEqual(1);
  });

  test('поднять ингридиент в заказе', () => {
    const newState = shopReducer(initialState, upItem(1));
    const { constructorItems } = newState;
    expect(constructorItems.ingredients[0]).toEqual(ingredient2);
    expect(constructorItems.ingredients[1]).toEqual(ingredient1);
    expect(constructorItems.ingredients.length).toEqual(2);
  });

  test('опустить ингридиент в заказе', () => {
    const newState = shopReducer(initialState, downItem(0));
    const { constructorItems } = newState;
    expect(constructorItems.ingredients[0]).toEqual(ingredient2);
    expect(constructorItems.ingredients[1]).toEqual(ingredient1);
    expect(constructorItems.ingredients.length).toEqual(2);
  });

  test('ресет текущего заказа', () => {
    const newState = shopReducer(initialState, resetCurrentOrder());
    const { currentOrder, constructorItems } = newState;
    expect(constructorItems.ingredients.length).toEqual(0);
    expect(currentOrder).toBe(null);
    expect(constructorItems.bun).toBe(undefined);
  });

  test('загрузка ингридиентов(pending)', () => {
    const expectedState = { ...initialState, isIngredientsLoading: true };
    const actualState = shopReducer(initialState, getIngredients.pending(''));
    expect(actualState).toEqual(expectedState);
  });

  test('загрузка ингридиентов(rejected)', () => {
    const expectedState = { ...initialState, isIngredientsLoading: false };
    const actualState = shopReducer(
      initialState,
      getIngredients.rejected(new Error(), '')
    );
    expect(actualState).toEqual(expectedState);
  });

  test('загрузка ингридиентов(fulfilled)', () => {
    const expectedState = {
      ...initialState,
      isIngredientsLoading: false,
      ingridients: ingredientsData
    };
    const actualState = shopReducer(
      initialState,
      getIngredients.fulfilled(ingredientsData, '')
    );
    expect(actualState).toEqual(expectedState);
  });

  test('загрузка ингридиентов(pending)', () => {
    const expectedState = { ...initialState, isIngredientsLoading: true };
    const actualState = shopReducer(initialState, getIngredients.pending(''));
    expect(actualState).toEqual(expectedState);
  });

  test('загрузка ингридиентов(rejected)', () => {
    const expectedState = { ...initialState, isIngredientsLoading: false };
    const actualState = shopReducer(
      initialState,
      getIngredients.rejected(new Error(), '')
    );
    expect(actualState).toEqual(expectedState);
  });

  test('загрузка ингридиентов(fulfilled)', () => {
    const expectedState = {
      ...initialState,
      isIngredientsLoading: false,
      ingridients: ingredientsData
    };
    const actualState = shopReducer(
      initialState,
      getIngredients.fulfilled(ingredientsData, '')
    );
    expect(actualState).toEqual(expectedState);
  });

  test('загрузка заказов(pending)', () => {
    const expectedState = { ...initialState, isFeedsLoading: true };
    const actualState = shopReducer(initialState, getFeeds.pending(''));
    expect(actualState).toEqual(expectedState);
  });

  test('загрузка заказов(rejected)', () => {
    const expectedState = { ...initialState, isFeedsLoading: false };
    const actualState = shopReducer(
      initialState,
      getFeeds.rejected(new Error(), '')
    );
    expect(actualState).toEqual(expectedState);
  });

  test('загрузка заказов(fulfilled)', () => {
    const totalOrder = feedsData.length;
    const totalToday = feedsData.length - 5;
    const expectedState = {
      ...initialState,
      isFeedsLoading: false,
      orders: feedsData,
      totalToday: totalToday,
      totalOrders: totalOrder
    };
    const actualState = shopReducer(
      initialState,
      getFeeds.fulfilled(
        {
          orders: feedsData,
          total: totalOrder,
          totalToday: totalToday,
          success: true
        },
        ''
      )
    );
    expect(actualState).toEqual(expectedState);
  });

  test('создание заказа(pending)', () => {
    const expectedState = { ...initialState, orderRequest: true };
    const actualState = shopReducer(
      initialState,
      createOrder.pending('', orderData)
    );
    expect(actualState).toEqual(expectedState);
  });

  test('создание заказа(rejected)', () => {
    const expectedState = { ...initialState, orderRequest: false };
    const actualState = shopReducer(
      initialState,
      createOrder.rejected(new Error(), '', orderData)
    );
    expect(actualState).toEqual(expectedState);
  });

  test('создание заказа(fulfilled)', () => {
    const expectedState = {
      ...initialState,
      orderRequest: false,
      currentOrder: orderResponseData
    };
    const actualState = shopReducer(
      initialState,
      createOrder.fulfilled(
        { order: orderResponseData, name: '', success: true },
        '',
        orderData
      )
    );
    expect(actualState).toEqual(expectedState);
  });

  test('получение заказов пользователя(pending)', () => {
    const expectedState = { ...initialState, isOrdersLoading: true };
    const actualState = shopReducer(initialState, getOrders.pending(''));
    expect(actualState).toEqual(expectedState);
  });

  test('получение заказов пользователя(rejected)', () => {
    const expectedState = { ...initialState, isOrdersLoading: false };
    const actualState = shopReducer(
      initialState,
      getOrders.rejected(new Error(), '')
    );
    expect(actualState).toEqual(expectedState);
  });

  test('получение заказов пользователя(fulfilled)', () => {
    const expectedState = {
      ...initialState,
      isOrdersLoading: false,
      userOrders: feedsData
    };
    const actualState = shopReducer(
      initialState,
      getOrders.fulfilled(feedsData, '')
    );
    expect(actualState).toEqual(expectedState);
  });
});
