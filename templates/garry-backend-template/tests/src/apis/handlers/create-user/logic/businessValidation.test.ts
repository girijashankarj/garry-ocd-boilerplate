import { businessValidation } from '../../../../../../src/apis/handlers/create-user/logic/businessValidation';

test('businessValidation accepts valid payload', () => {
  expect(businessValidation({ name: 'a', email: 'a@a.com' })).toBe(true);
});
