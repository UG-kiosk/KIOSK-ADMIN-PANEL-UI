export interface EctsSubject {
  _id?: string;
  subject: string;
  lectureHours: number;
  recitationHours: number;
  labsHours: number;
  pass: string;
  ects: number;
  major: string;
  degree: string;
  term: number;
  year: string;
  recruitmentYear: number[];
  speciality?: string;
}
