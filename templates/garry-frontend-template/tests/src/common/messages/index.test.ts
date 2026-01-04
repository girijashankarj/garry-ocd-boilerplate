import { INFO_MESSAGES, ERROR_MESSAGES } from '../../../../src/common/messages';

test('messages index exports', () => {
  expect(INFO_MESSAGES.APP_START).toBeDefined();
  expect(ERROR_MESSAGES.UNEXPECTED).toBeDefined();
});
