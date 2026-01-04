import { DEBUG_MESSAGES } from '../../../../src/common/messages/debug';

test('debug messages exist', () => {
  expect(DEBUG_MESSAGES.QUERY).toBe('debug.query');
});
