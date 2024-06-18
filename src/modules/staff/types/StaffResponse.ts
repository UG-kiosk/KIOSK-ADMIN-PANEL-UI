import { IPagination } from '../../../shared/types/Pagination';

interface AcademicResponse {
  _id: string;
  name: string;
  email: string;
  link: string;
  units: string[];
  content: AcademicContent;
}

interface AcademicContent {
  posts: { position: string; faculty: string[] }[];
  tutorial: string;
}

export interface StaffResponse {
  response: AcademicResponse[];
  pagination: IPagination;
}
