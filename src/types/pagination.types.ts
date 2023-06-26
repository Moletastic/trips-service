export interface Pagination {
  total: number;
}

export type Paginated<T> = {
  items: T[];
  pagination: Pagination;
};
