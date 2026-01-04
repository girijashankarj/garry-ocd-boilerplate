import type { CreateUserRequest } from '../../../common/types';

export const preOperation = async (payload: CreateUserRequest): Promise<CreateUserRequest> => {
  return payload;
};
