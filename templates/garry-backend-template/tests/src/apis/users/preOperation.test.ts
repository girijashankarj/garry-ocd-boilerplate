import { preCreate } from '../../../../src/apis/users/preOperation';

test('preCreate returns payload', async () => {
  const payload = { name: 'a', email: 'a@a.com' };
  const result = await preCreate(payload);
  expect(result).toEqual(payload);
});
