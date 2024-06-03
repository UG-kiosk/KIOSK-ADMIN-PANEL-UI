import { HTTP_METHOD } from '../../../shared/constants/httpMethods';
import { LessonPlanRequest, LessonResponse } from '../types/lessons';

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

export const getLessonsCall = async (language: string, page: string): Promise<LessonResponse> => {
  const params = new URLSearchParams({
    language,
    page,
  });
  const getLessonsUrl = new URL(`http://localhost:5202/kiosk-api/lessonsPlans/all?${params.toString()}`);

  const response = await fetch(getLessonsUrl, {
    method: HTTP_METHOD.GET,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`[getLessonsUrl]: ${response.status}. ${response.statusText}.`);
  }

  const data = await response.json();

  return data;
};
