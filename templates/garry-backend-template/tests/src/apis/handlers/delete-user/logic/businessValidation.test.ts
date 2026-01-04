import { businessValidation } from '../../../../../../src/apis/handlers/delete-user/logic/businessValidation';

test('businessValidation accepts valid id', () => {
  expect(businessValidation({ id: '1' })).toBe(true);
});
