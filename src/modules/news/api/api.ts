import { HTTP_METHOD } from '../../../shared/constants/httpMethods';
import { NewsRequest, NewsResponse, NewsResponseDTO } from '../types/news';

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

export const getNewsCall = async (language: string, page: string, source: string): Promise<NewsResponse> => {
  const params = new URLSearchParams({
    language,
    page,
    source,
  });
  const getNewsUrl = new URL(`http://localhost:5202/kiosk-api/news?${params.toString()}`);

  const response = await fetch(getNewsUrl, {
    method: HTTP_METHOD.GET,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`[getNewsUrl]: ${response.status}. ${response.statusText}.`);
  }

  const data = await response.json();

  return data;
};

export const getNewsDetailsCall = async (id: string): Promise<NewsResponseDTO> => {
  const language = 'PL';
  const getNewsDetailsUrl = new URL('http://localhost:5202/kiosk-api/news/' + id + '?language=' + language);

  const response = await fetch(getNewsDetailsUrl, {
    method: HTTP_METHOD.GET,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`[getNewsDetailsUrl]: ${response.status}. ${response.statusText}.`);
  }

  const data = await response.json();

  return data;
};
