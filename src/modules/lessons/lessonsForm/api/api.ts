import { HTTP_METHOD } from '../../../../shared/constants/httpMethods';
import { LessonPlanRequest } from '../types/lessons';

export const addLessonsCall = async (body: LessonPlanRequest): Promise<LessonPlanRequest> => {
  const addLessonsUrl = new URL('http://localhost:5202/lessonsPlans');

  const response = await fetch(addLessonsUrl, {
    method: HTTP_METHOD.POST,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([body]),
  });

  if (!response.ok) {
    throw new Error(`[addLessonsUrl]: ${response.status}. ${response.statusText}.`);
  }

  const data = await response.json();

  return data;
};
