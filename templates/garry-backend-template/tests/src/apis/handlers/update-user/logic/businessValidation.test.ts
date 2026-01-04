import { businessValidation } from '../../../../../../src/apis/handlers/update-user/logic/businessValidation';

test('businessValidation accepts valid payload', () => {
  expect(businessValidation({ id: '1', name: 'a', email: 'a@a.com' })).toBe(true);
});
