export interface PaginateResult<T> {
  data: Array<T>;
  total: number;
  page: number;
}
