import { EctsSubject } from './ectsSubject';
import { PaginationResponse } from './pagination';

export interface EctsResponse {
  ectsSubjects: EctsSubject[];
  pagination: PaginationResponse;
}
