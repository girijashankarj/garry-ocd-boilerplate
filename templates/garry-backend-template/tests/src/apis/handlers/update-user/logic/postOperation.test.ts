import { postOperation } from '../../../../../../src/apis/handlers/update-user/logic/postOperation';

test('postOperation returns result', async () => {
  const result = { id: 1 };
  await expect(postOperation(result)).resolves.toEqual(result);
});
