import type { IdParam } from '../../../common/types';

export const businessValidation = (payload: IdParam): boolean => {
  return payload.id.length > 0;
};
