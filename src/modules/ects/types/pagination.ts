import { Degree } from '../../../shared/constants/degree';
import { SortDirection } from './sort';

export interface PaginationRequest {
  page?: number;
  itemsPerPage?: number;
  filterBy?: string | null;
  sortDirection?: SortDirection;
  degree?: Degree;
}

export interface PaginationResponse {
  page?: number;
  totalPages?: number;
  itemsPerPage?: number;
  hasNextPage?: number;
}
