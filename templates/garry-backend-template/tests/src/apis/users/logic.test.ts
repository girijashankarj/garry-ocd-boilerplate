import { createUserLogic, getUserById } from '../../../../src/apis/users/logic';

test('logic exports are defined', () => {
  expect(typeof getUserById).toBe('function');
  expect(typeof createUserLogic).toBe('function');
});
