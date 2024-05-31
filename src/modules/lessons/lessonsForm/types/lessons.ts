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
