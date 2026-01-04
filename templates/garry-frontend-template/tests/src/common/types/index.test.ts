import type { ID, Nullable } from '../../../../src/common/types';

test('types compile', () => {
  const id: ID = '1';
  const value: Nullable<string> = id;
  expect(value).toBe('1');
});
