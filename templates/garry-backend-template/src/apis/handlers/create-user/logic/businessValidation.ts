import type { CreateUserRequest } from '../../../common/types';

export const businessValidation = (payload: CreateUserRequest): boolean => {
  return payload.name.length > 0 && payload.email.length > 0;
};
