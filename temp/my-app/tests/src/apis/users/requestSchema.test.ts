import { createUserSchema } from '../../../../src/apis/users/requestSchema';

test('request schema defines required fields', () => {
  expect(createUserSchema.required).toContain('name');
  expect(createUserSchema.required).toContain('email');
});
