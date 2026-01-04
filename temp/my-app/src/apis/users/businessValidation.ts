import type { CreateUserRequest } from './requestSchema';

export function businessValidateCreate(payload: CreateUserRequest): boolean {
  void payload;
  // business rules e.g., unique email, allowed domains, etc.
  return true;
}
