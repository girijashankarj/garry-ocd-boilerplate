import { ERROR_MESSAGES } from '../../../../src/common/messages/error';

test('error messages exist', () => {
  expect(ERROR_MESSAGES.NOT_FOUND).toBe('error.not_found');
  expect(ERROR_MESSAGES.UNAUTHORIZED).toBe('error.unauthorized');
});
