import { createUser, deleteUser, getUsers, updateUser } from '../../../src/utils/dataUtils';

const sample = { name: 'A', email: 'a@b.com', role: 'viewer' as const };

test('data utils create/update/delete with csv storage', async () => {
  window.localStorage.clear();
  const created = await createUser(sample);
  const list = await getUsers();
  expect(list).toHaveLength(1);

  const updated = await updateUser({ id: created.id, name: 'B' });
  expect(updated.name).toBe('B');

  await deleteUser(created.id);
  const afterDelete = await getUsers();
  expect(afterDelete).toHaveLength(0);
});
