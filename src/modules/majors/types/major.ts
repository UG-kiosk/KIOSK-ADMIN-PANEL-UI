import { Degree } from '../../../shared/constants/degree';

export interface MajorScraperResponseDto {
  name: string;
  url: string;
  content: string | null;
  degree: Degree;
}
