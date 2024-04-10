import { Degree } from '../../../shared/constants/degree';
import { Language } from '../../../shared/constants/language';
import { MajorDetails } from './majorDetails';

export interface CreateMajorRequest {
  majorDetails: MajorDetails;
  url?: string;
  degree: Degree;
  sourceLanguage: Language;
}
