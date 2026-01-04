import { UserRole, INFO_MESSAGES } from '../../../src/common';

test('common index exports', () => {
  expect(UserRole.USER).toBe('user');
  expect(INFO_MESSAGES.APP_STARTED).toBeDefined();
});
