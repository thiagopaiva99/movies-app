export interface Pagination<T> {
  page: number;
  totalPages: number;
  totalResults: number;
  results: T[];
}
