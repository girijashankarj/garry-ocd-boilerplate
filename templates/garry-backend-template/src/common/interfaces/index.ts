/* eslint-disable */
export interface Pagination {
  page: number;
  pageSize: number;
}
export interface ApiResult<T> {
  ok: boolean;
  data?: T;
  error?: string;
}
