import { INFO_MESSAGES, ERROR_MESSAGES } from '../../../../src/common/messages';

test('messages index exports', () => {
  expect(INFO_MESSAGES.APP_STARTED).toBeDefined();
  expect(ERROR_MESSAGES.DB).toBeDefined();
});
