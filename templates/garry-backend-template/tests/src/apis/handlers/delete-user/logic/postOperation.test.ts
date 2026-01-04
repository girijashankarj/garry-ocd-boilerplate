import { postOperation } from '../../../../../../src/apis/handlers/delete-user/logic/postOperation';

test('postOperation returns result', async () => {
  const result = { id: '1' };
  await expect(postOperation(result)).resolves.toEqual(result);
});
