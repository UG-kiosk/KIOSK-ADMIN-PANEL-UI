import { HTTP_METHOD } from '../../../../shared/constants/httpMethods';
import { EctsSubject } from '../types/ectsSubject';

export const addEctsSubjectCall = async (body: EctsSubject): Promise<EctsSubject> => {
  const addEctsSubjectUrl = new URL('https://kiosk-api-dev-latest.onrender.com/ects-subjects');

  const response = await fetch(addEctsSubjectUrl, {
    method: HTTP_METHOD.POST,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`[addEctsSubjectUrl]: ${response.status}. ${response.statusText}.`);
  }

  const data = await response.json();

  return data;
};
