import { Degree } from '../../../shared/constants/degree';
import { Language } from '../../../shared/constants/language';

export interface GetMajorsRequestParams {
  language: Language;
  degree: Degree;
  name: string;
}
