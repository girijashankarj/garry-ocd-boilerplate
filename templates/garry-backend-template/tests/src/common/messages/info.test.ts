import { INFO_MESSAGES } from '../../../../src/common/messages/info';

test('info messages exist', () => {
  expect(INFO_MESSAGES.APP_STARTED).toBe('app.started');
});
