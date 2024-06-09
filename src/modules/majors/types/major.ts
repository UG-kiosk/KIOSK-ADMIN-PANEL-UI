import { Degree } from '../../../shared/constants/degree';
import { Language } from '../../../shared/constants/language';
import { MajorDetails } from './majorDetails';

export interface MajorScraperResponseDto {
  name: string;
  url: string;
  content: string | null;
  degree: Degree;
}

export interface MajorFormValues {
  degree: Degree;
  language: Language;
  url?: string;
  name: string;
  content: string;
}

export interface CreateMajorRequestDto {
  degree: Degree;
  sourceLanguage: Language;
  url?: string;
  majorDetails: MajorDetails;
}

export interface Major {
  _id: string;
  degree: Degree;
  sourceLanguage: Language;
  url?: string;
  name: string;
  content: string;
}
