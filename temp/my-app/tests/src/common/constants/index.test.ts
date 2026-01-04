import { DEFAULT_PAGE_SIZE } from '../../../../src/common/constants';

test('constants are defined', () => {
  expect(DEFAULT_PAGE_SIZE).toBeGreaterThan(0);
});
