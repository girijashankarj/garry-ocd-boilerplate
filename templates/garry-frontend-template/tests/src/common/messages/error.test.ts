import { ERROR_MESSAGES } from '../../../../src/common/messages/error';

test('error messages exist', () => {
  expect(ERROR_MESSAGES.UNEXPECTED).toBe('unexpected_error');
});
