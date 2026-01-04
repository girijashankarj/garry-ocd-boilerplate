import type { CreateUserRequest, IdParam } from '../../../common/types';
import { modelUpdateUser } from '../../../common/utils/modelOperations';

type UpdateRequest = CreateUserRequest & IdParam;

export const dbOperation = async (payload: UpdateRequest) => {
  const { id, ...updatePayload } = payload;
  return modelUpdateUser(id, updatePayload);
};
