import type { IdParam } from '../../../common/types';

export const preOperation = async (payload: IdParam): Promise<IdParam> => {
  return payload;
};
