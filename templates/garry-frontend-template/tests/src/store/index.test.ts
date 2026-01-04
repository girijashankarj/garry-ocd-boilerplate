import store from '../../../src/store';

test('store is configured', () => {
  expect(store.getState).toBeDefined();
});
