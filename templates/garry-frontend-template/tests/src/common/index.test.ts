import { ThemeMode, INFO_MESSAGES } from '../../../src/common';

test('common index exports', () => {
  expect(ThemeMode.LIGHT).toBe('light');
  expect(INFO_MESSAGES.APP_START).toBeDefined();
});
