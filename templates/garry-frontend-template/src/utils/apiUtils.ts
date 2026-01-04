import type { CreateUserInput, UpdateUserInput, User } from '../common/types';

export const fetchUsers = async (): Promise<User[]> => {
  return [];
};

export const createUser = async (_input: CreateUserInput): Promise<User> => {
  throw new Error('apiUtils.createUser not implemented');
};

export const updateUser = async (_input: UpdateUserInput): Promise<User> => {
  throw new Error('apiUtils.updateUser not implemented');
};

export const deleteUser = async (_id: string): Promise<void> => {
  throw new Error('apiUtils.deleteUser not implemented');
};
