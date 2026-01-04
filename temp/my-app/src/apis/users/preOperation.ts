import type { CreateUserRequest } from './requestSchema';

export async function preCreate(payload: CreateUserRequest): Promise<CreateUserRequest> {
  // add hooks, defaulting, etc.
  return payload;
}
