import type { CreateUserRequest, IdParam } from '../../../common/types';

type UpdateRequest = CreateUserRequest & IdParam;

export const preOperation = async (payload: UpdateRequest): Promise<UpdateRequest> => {
  return payload;
};
