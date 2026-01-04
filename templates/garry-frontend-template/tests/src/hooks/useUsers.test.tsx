import { renderHook, act } from '@testing-library/react';
import { useUsers } from '../../../src/hooks/useUsers';

jest.mock('../../../src/utils/dataUtils', () => ({
  getUsers: jest.fn(async () => []),
  createUser: jest.fn(async () => ({ id: '1' })),
  updateUser: jest.fn(async () => ({ id: '1' })),
  deleteUser: jest.fn(async () => undefined),
}));

test('useUsers loads and exposes handlers', async () => {
  const { result } = renderHook(() => useUsers());
  expect(result.current.users).toBeDefined();

  await act(async () => {
    await result.current.createUser({ name: 'A', email: 'a@b.com', role: 'viewer' });
  });

  expect(result.current.createUser).toBeDefined();
});
