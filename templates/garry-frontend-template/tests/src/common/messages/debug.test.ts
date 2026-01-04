import { DEBUG_MESSAGES } from '../../../../src/common/messages/debug';

test('debug messages exist', () => {
  expect(DEBUG_MESSAGES.STATE_SNAPSHOT).toBe('state_snapshot');
});
