import { validateCreateUser } from '../../../../src/apis/users/validation';

test('validation accepts valid payload', () => {
  const payload = { name: 'a', email: 'a@a.com' };
  expect(validateCreateUser(payload)).toEqual(payload);
});

test('validation rejects invalid payload', () => {
  expect(() => validateCreateUser({ name: '' })).toThrow();
});
