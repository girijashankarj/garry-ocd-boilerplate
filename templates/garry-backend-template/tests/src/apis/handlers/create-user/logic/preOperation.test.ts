import { preOperation } from '../../../../../../src/apis/handlers/create-user/logic/preOperation';

test('preOperation returns payload', async () => {
  const payload = { name: 'a', email: 'a@a.com' };
  await expect(preOperation(payload)).resolves.toEqual(payload);
});
