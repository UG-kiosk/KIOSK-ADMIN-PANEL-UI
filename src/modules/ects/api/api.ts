import { HTTP_METHOD } from '../../../shared/constants/httpMethods';
import { EctsResponse } from '../types/ectsResponse';
import { EctsSubject } from '../types/ectsSubject';
import { PaginationRequest } from '../types/pagination';

export const addEctsSubjectCall = async (body: EctsSubject): Promise<EctsSubject> => {
  const addEctsSubjectUrl = new URL('http://localhost:5202/kiosk-api/ects-subjects');

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

export const fetchEctsSubjects = async (pagination: PaginationRequest): Promise<EctsResponse> => {
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

export const deleteEctsSubject = async (id: string) => {
  const deleteEctsSubject = new URL(`http://localhost:5202/kiosk-api/ects-subjects/${id}`);

  const response = await fetch(deleteEctsSubject, {
    method: HTTP_METHOD.DELETE,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`[deleteEctsSubjects]: ${response.status}. ${response.statusText}.`);
  }
};

export const updateEctsSubject = async (body: EctsSubject) => {
  const getOneSubjectUrl = new URL('http://localhost:5202/kiosk-api/ects-subjects');

  const response = await fetch(getOneSubjectUrl, {
    method: HTTP_METHOD.PUT,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`[updateEctsSubject]: ${response.status}. ${response.statusText}.`);
  }
};

export const fetchOneEctsSubject = async (id: string): Promise<EctsSubject> => {
  const getOneSubjectUrl = new URL(`http://localhost:5202/kiosk-api/ects-subjects/document/${id}`);

  const response = await fetch(getOneSubjectUrl, {
    method: HTTP_METHOD.GET,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`[deleteEctsSubjects]: ${response.status}. ${response.statusText}.`);
  }

  const data = await response.json();

  return data;
};
