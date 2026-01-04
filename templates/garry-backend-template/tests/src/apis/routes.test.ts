import { createApiRouter } from '../../../src/apis/routes';

test('createApiRouter returns router', () => {
  const router = createApiRouter();
  expect(router).toBeDefined();
});
