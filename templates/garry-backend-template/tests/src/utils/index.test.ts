import { cloneDeep } from '../../../src/utils';

test('utils index exports', () => {
  expect(typeof cloneDeep).toBe('function');
});
