import { User } from '../../models/user';
import type { CreateUserRequest } from './requestSchema';

export async function getUserById(id: number | string) {
  return User.findByPk(id);
}

export async function createUserLogic(payload: CreateUserRequest) {
  return User.create(payload);
}
