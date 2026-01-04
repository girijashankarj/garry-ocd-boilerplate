import { createUser, getUser } from '../../../../src/apis/users/handlers';

test('handlers index exports', () => {
  expect(typeof getUser).toBe('function');
  expect(typeof createUser).toBe('function');
});
