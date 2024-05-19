import { HTTP_METHOD } from '../../../../shared/constants/httpMethods';
import { NewsRequest } from '../types/news';

export const addNewsCall = async (body: NewsRequest): Promise<NewsRequest> => {
  const addNewsUrl = new URL('http://localhost:5202/news');

  const response = await fetch(addNewsUrl, {
    method: HTTP_METHOD.POST,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([body]),
  });

  if (!response.ok) {
    throw new Error(`[addNewsUrl]: ${response.status}. ${response.statusText}.`);
  }

  const data = await response.json();

  return data;
};
