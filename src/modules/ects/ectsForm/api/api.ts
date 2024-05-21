import { HTTP_METHOD } from '../../../../shared/constants/httpMethods';
import { EctsResponse } from '../../types/ectsResponse';
import { EctsSubject } from '../../types/ectsSubject';
import { PaginationRequest } from '../../types/pagination';

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

export const prepareEctsSubjectsApiUrl = (
  apiUrl: URL,
  { itemsPerPage, page, filterBy, sortDirection, degree }: PaginationRequest,
) => {
  itemsPerPage && apiUrl.searchParams.set('ItemsPerPage', String(itemsPerPage));
  page && apiUrl.searchParams.set('Page', String(page));
  filterBy && apiUrl.searchParams.set('filterValue', String(filterBy));
  sortDirection && apiUrl.searchParams.set('sortDirection', String(sortDirection));
  degree && apiUrl.searchParams.set('Degree', String(degree));

  return apiUrl;
};

export const fetchEctsSubject = async (pagination: PaginationRequest): Promise<EctsResponse> => {
  const getAllSubjecstUrl = new URL('http://localhost:5202/kiosk-api/ects-subjects');

  const apiUrlWithParams = prepareEctsSubjectsApiUrl(getAllSubjecstUrl, pagination);

  const response = await fetch(apiUrlWithParams, {
    method: HTTP_METHOD.GET,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`[addEctsSubjectUrl]: ${response.status}. ${response.statusText}.`);
  }

  const data = await response.json();

  return data;
};
