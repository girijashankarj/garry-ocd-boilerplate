import { modelGetUserById } from '../../../common/utils/modelOperations';
import type { IdParam } from '../../../common/types';

export const dbOperation = async (payload: IdParam) => {
  return modelGetUserById(payload.id);
};
