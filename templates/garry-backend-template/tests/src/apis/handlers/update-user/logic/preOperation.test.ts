import { preOperation } from '../../../../../../src/apis/handlers/update-user/logic/preOperation';

test('preOperation returns payload', async () => {
  const payload = { id: '1', name: 'a', email: 'a@a.com' };
  await expect(preOperation(payload)).resolves.toEqual(payload);
});
