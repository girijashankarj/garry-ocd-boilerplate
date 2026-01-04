/* eslint-disable */
export type Nullable<T> = T | null;
export type ID = string | number;

export type UserRole = 'admin' | 'editor' | 'viewer';

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
};

export type CreateUserInput = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateUserInput = Partial<Omit<User, 'id' | 'createdAt'>> & { id: string };
