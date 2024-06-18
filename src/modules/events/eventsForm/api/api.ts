import { HTTP_METHOD } from '../../../../shared/constants/httpMethods';
import { EventRequest } from '../../types/events';

export const addEventCall = async (body: EventRequest): Promise<EventRequest> => {
  const addEventUrl = new URL('http://localhost:5202/events');

  const response = await fetch(addEventUrl, {
    method: HTTP_METHOD.POST,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`[addEventUrl]: ${response.status}. ${response.statusText}.`);
  }

  const data = await response.json();

  return data;
};
