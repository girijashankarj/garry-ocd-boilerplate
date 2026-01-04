import { BREAKPOINTS, THEME_COLORS } from '../../../../src/common/constants';

test('constants are defined', () => {
  expect(BREAKPOINTS.md).toBe(768);
  expect(THEME_COLORS.primary).toBeDefined();
});
