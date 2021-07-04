export interface PaginateResult<T> {
  data: Array<T>;
  totalPage: number;
  page: number;
}
