import { WARN_MESSAGES } from '../../../../src/common/messages/warn';

test('warn messages exist', () => {
  expect(WARN_MESSAGES.DEPRECATED).toBe('warn.deprecated');
});
