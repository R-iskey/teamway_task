export type ListResponse<T> = {
  results: T[];
  totalPages: number;
  limit: number;
  page: number;
  totalResults: number;
}
