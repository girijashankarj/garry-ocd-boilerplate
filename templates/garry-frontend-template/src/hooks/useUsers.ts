import { useCallback, useEffect, useState } from 'react';
import type { CreateUserInput, UpdateUserInput, User } from '../common/types';
import { createUser, deleteUser, getUsers, updateUser } from '../utils/dataUtils';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await getUsers();
      setUsers(list);
    } catch (err) {
      setError('failed_to_load_users');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCreate = useCallback(async (input: CreateUserInput) => {
    setLoading(true);
    setError(null);
    try {
      const created = await createUser(input);
      setUsers((prev) => [...prev, created]);
      return created;
    } catch (err) {
      setError('failed_to_create_user');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const handleUpdate = useCallback(async (input: UpdateUserInput) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await updateUser(input);
      setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
      return updated;
    } catch (err) {
      setError('failed_to_update_user');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      setError('failed_to_delete_user');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return {
    users,
    loading,
    error,
    refresh,
    createUser: handleCreate,
    updateUser: handleUpdate,
    deleteUser: handleDelete,
  };
};
