import { createUser, deleteUser, fetchUsers, updateUser } from '../../../src/utils/apiUtils';

test('api utils default stubs', async () => {
  await expect(fetchUsers()).resolves.toEqual([]);
  await expect(createUser({ name: 'A', email: 'a@b.com', role: 'viewer' })).rejects.toThrow();
  await expect(updateUser({ id: '1' })).rejects.toThrow();
  await expect(deleteUser('1')).rejects.toThrow();
});
