import type { ID, Nullable } from '../../../../src/common/types';

test('types compile', () => {
  const id: ID = 1;
  const value: Nullable<number> = id;
  expect(value).toBe(1);
});
