import { userResponseSchema } from '../../../../src/apis/users/responseSchema';

test('response schema defines required fields', () => {
  expect(userResponseSchema.required).toContain('id');
});
