import type { CreateUserRequest, IdParam } from '../../../common/types';

type UpdateRequest = CreateUserRequest & IdParam;

export const businessValidation = (payload: UpdateRequest): boolean => {
  return payload.id.length > 0 && payload.name.length > 0 && payload.email.length > 0;
};
