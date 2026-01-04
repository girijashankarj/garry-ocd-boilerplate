import { loggerError, loggerInfo } from './loggerUtils';
import type { CreateUserInput, UpdateUserInput, User } from '../common/types';
import { parseCsvUsers, usersToCsv } from './csvUtils';
import * as apiUtils from './apiUtils';

const CSV_KEY = 'garry_users_csv';

const nowIso = () => new Date().toISOString();
const newId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `user_${Date.now()}_${Math.random().toString(16).slice(2)}`;

const loadCsvUsers = (): User[] => {
  const csv = window.localStorage.getItem(CSV_KEY) || '';
  return parseCsvUsers(csv);
};

const saveCsvUsers = (users: User[]) => {
  const csv = usersToCsv(users);
  window.localStorage.setItem(CSV_KEY, csv);
};

export const getUsers = async (): Promise<User[]> => {
  try {
    if (import.meta.env.VITE_DATA_MODE === 'api') {
      return await apiUtils.fetchUsers();
    }
    return loadCsvUsers();
  } catch (err) {
    loggerError('error.data_utils_get_users', err, 'dataUtils', 'src/utils/dataUtils.ts', 'getUsers');
    return [];
  }
};

export const createUser = async (input: CreateUserInput): Promise<User> => {
  try {
    if (import.meta.env.VITE_DATA_MODE === 'api') {
      return await apiUtils.createUser(input);
    }
    const users = loadCsvUsers();
    const next: User = {
      id: newId(),
      createdAt: nowIso(),
      updatedAt: nowIso(),
      ...input,
    };
    const nextUsers = [...users, next];
    saveCsvUsers(nextUsers);
    loggerInfo('info.user_created', { id: next.id }, 'dataUtils', 'src/utils/dataUtils.ts', 'createUser');
    return next;
  } catch (err) {
    loggerError('error.data_utils_create_user', err, 'dataUtils', 'src/utils/dataUtils.ts', 'createUser');
    throw err;
  }
};

export const updateUser = async (input: UpdateUserInput): Promise<User> => {
  try {
    if (import.meta.env.VITE_DATA_MODE === 'api') {
      return await apiUtils.updateUser(input);
    }
    const users = loadCsvUsers();
    const idx = users.findIndex((u) => u.id === input.id);
    if (idx === -1) {
      throw new Error('user_not_found');
    }
    const updated: User = {
      ...users[idx],
      ...input,
      updatedAt: nowIso(),
    };
    const nextUsers = users.map((u, i) => (i === idx ? updated : u));
    saveCsvUsers(nextUsers);
    loggerInfo('info.user_updated', { id: input.id }, 'dataUtils', 'src/utils/dataUtils.ts', 'updateUser');
    return updated;
  } catch (err) {
    loggerError('error.data_utils_update_user', err, 'dataUtils', 'src/utils/dataUtils.ts', 'updateUser');
    throw err;
  }
};

export const deleteUser = async (id: string): Promise<void> => {
  try {
    if (import.meta.env.VITE_DATA_MODE === 'api') {
      return await apiUtils.deleteUser(id);
    }
    const users = loadCsvUsers();
    const nextUsers = users.filter((u) => u.id !== id);
    saveCsvUsers(nextUsers);
    loggerInfo('info.user_deleted', { id }, 'dataUtils', 'src/utils/dataUtils.ts', 'deleteUser');
  } catch (err) {
    loggerError('error.data_utils_delete_user', err, 'dataUtils', 'src/utils/dataUtils.ts', 'deleteUser');
    throw err;
  }
};
