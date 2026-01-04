import { createUser, getUser } from '../../../../src/apis/users/handlers/getUser';

test('handlers are defined', () => {
  expect(typeof getUser).toBe('function');
  expect(typeof createUser).toBe('function');
});
