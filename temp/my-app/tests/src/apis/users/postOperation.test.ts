import { postCreate } from '../../../../src/apis/users/postOperation';

test('postCreate returns result', async () => {
  const result = { id: 1 };
  const output = await postCreate(result);
  expect(output).toEqual(result);
});
