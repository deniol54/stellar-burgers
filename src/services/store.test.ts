import store, { rootReducer } from './store';

test('проверка работы rootReducer', () => {
  const initAction = { type: '@@INIT' };
  const initialState = store.getState();
  const state = rootReducer(undefined, initAction);
  expect(state).toEqual(initialState);
});
