import { cloneDeep } from '../../../src/utils/lodashUtils';

test('cloneDeep clones objects', () => {
  const obj = { a: 1 };
  const cloned = cloneDeep(obj);
  expect(cloned).toEqual(obj);
  expect(cloned).not.toBe(obj);
});
