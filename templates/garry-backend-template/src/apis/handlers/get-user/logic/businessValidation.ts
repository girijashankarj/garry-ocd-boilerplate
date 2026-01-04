import type { IdParam } from '../../../common/types';

export const businessValidation = (payload: IdParam): boolean => {
  return typeof payload.id === 'string' && payload.id.length > 0;
};
