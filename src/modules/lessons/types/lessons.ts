import { IPagination } from '../../../shared/types/Pagination';

export interface LessonPlan {
  name: string;
  year: number;
  day: DaysOfWeek;
  start: number;
  duration: number;
  groups: string[];
  teachers: string[];
  class: string;
  subject: string;
  type: LessonType;
  info: string[];
}

export interface LessonPlanRequest {
  name: string;
  year: number;
  day: DaysOfWeek;
  start: number;
  duration: number;
  groups: string[];
  teachers: string[];
  class: string;
  details: {
    subject: string;
    type: LessonType;
    info: string[];
  };
  sourceLanguage: string;
}

export interface LessonPlanResponseDTO {
  _id: string;
  name: string;
  year: number;
  day: DaysOfWeek;
  start: number;
  duration: number;
  groups: string[];
  teachers: string[];
  class: string;
  subject: string;
  type: LessonType;
  info: string[];
  language: string;
}

export interface LessonResponse {
  content: LessonPlanResponseDTO[];
  pagination: IPagination;
}

export enum DaysOfWeek {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
}

export enum LessonType {
  wykład = 'wykład',
  laboratorium = 'laboratorium',
  seminarium = 'seminarium',
  ćwiczenia = 'ćwiczenia',
}
