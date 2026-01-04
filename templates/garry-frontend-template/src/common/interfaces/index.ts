/* eslint-disable */
export interface ApiResult<T> {
  ok: boolean;
  data?: T;
  error?: string;
}
