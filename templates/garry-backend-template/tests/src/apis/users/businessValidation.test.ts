import { businessValidateCreate } from '../../../../src/apis/users/businessValidation';

test('business validation returns true by default', () => {
  const payload = { name: 'a', email: 'a@a.com' };
  expect(businessValidateCreate(payload)).toBe(true);
});
