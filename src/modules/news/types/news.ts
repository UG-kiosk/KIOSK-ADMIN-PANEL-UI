import { IPagination } from '../../../shared/types/Pagination';

export interface News {
  leadingPhoto: string;
  photos: string[];
  link: string;
  datetime: Date;
  title: string;
  shortBody: string;
  body: string;
  source: NewsSource;
  category: NewsCategory;
}

export interface NewsRequest {
  leadingPhoto: string;
  photos: string[];
  link: string;
  datetime: Date;
  newsDetails: {
    title: string;
    shortBody: string;
    body: string;
  };
  source: NewsSource;
  category: NewsCategory;
  sourceLanguage: string;
}

export enum NewsCategory {
  NEWS = 'NEWS',
  STUDENTS = 'STUDENTS',
  ARCHIVE = 'ARCHIVE',
}

export enum NewsSource {
  INF = 'INF',
  MFI = 'MFI',
}

export enum NewsSourceAll {
  ALL = 'ALL',
  INF = 'INF',
  MFI = 'MFI',
}

export interface NewsResponseDTO {
  _id: string;
  leadingPhoto: string;
  photos: string[];
  link: string;
  datetime: Date;
  title: string;
  shortBody: string;
  body: string;
  source: NewsSource;
  category: NewsCategory;
  language: string;
}

export interface NewsResponse {
  content: NewsResponseDTO[];
  pagination: IPagination;
}
