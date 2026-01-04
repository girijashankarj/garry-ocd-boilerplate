import { User } from '../../../models/user';
import type { CreateUserRequest } from '../types';

export const modelGetUserById = (id: number | string) => User.findByPk(id);

export const modelCreateUser = (payload: CreateUserRequest) => User.create(payload);

export const modelUpdateUser = async (id: number | string, payload: CreateUserRequest) => {
  const user = await User.findByPk(id);
  if (!user) return null;
  return user.update(payload);
};

export const modelDeleteUser = async (id: number | string) => {
  const user = await User.findByPk(id);
  if (!user) return null;
  await user.destroy();
  return { id };
};
