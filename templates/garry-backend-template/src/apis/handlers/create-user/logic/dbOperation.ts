import type { CreateUserRequest } from '../../../common/types';
import { modelCreateUser } from '../../../common/utils/modelOperations';

export const dbOperation = async (payload: CreateUserRequest) => {
  return modelCreateUser(payload);
};
