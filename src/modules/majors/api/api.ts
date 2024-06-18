import { environment } from '../../../environments/environment';
import { HTTP_METHOD } from '../../../shared/constants/httpMethods';
import { Language } from '../../../shared/constants/language';
import { GetMajorsRequestParams } from '../types/getMajorsRequestParams';
import { CreateMajorRequestDto, Major } from '../types/major';

export const prepareGetAllMajorsApiUrl = (apiUrl: URL, { language, degree, name }: GetMajorsRequestParams): URL => {
  language && apiUrl.searchParams.set('Language', String(language));
  name && apiUrl.searchParams.set('Name', String(name));
  degree && apiUrl.searchParams.set('Degree', String(degree));

  return apiUrl;
};

export const prepareGetMajorApiUrl = (apiUrl: URL, language: Language): URL => {
  language && apiUrl.searchParams.set('Language', String(language));

  return apiUrl;
};

export const createMajorCall = async (body: CreateMajorRequestDto[]): Promise<CreateMajorRequestDto> => {
  const createMajorUrl = new URL(environment.KIOSK_API_URL + '/majors');

  const response = await fetch(createMajorUrl, {
    method: HTTP_METHOD.POST,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`[createMajorsUrl]: ${response.status}. ${response.statusText}.`);
  }

  const data = await response.json();

  return data;
};

export const getAllMajorsCall = async (getMajorsRequestParams: GetMajorsRequestParams): Promise<Major[]> => {
  const getAllMajorsUrl = new URL(environment.KIOSK_API_URL + '/majors');
  const urlWithParams = prepareGetAllMajorsApiUrl(getAllMajorsUrl, getMajorsRequestParams);

  const response = await fetch(urlWithParams, {
    method: HTTP_METHOD.GET,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`[getAllMajorsUrl]: ${response.status}. ${response.statusText}.`);
  }

  const data = await response.json();

  return data;
};

export const getMajorCall = async (id: string, language: Language = Language.PL): Promise<Major> => {
  const getMajorUrl = new URL(environment.KIOSK_API_URL + '/majors/' + id);
  const urlWithParams = prepareGetMajorApiUrl(getMajorUrl, language);

  const response = await fetch(urlWithParams, {
    method: HTTP_METHOD.GET,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`[getMajorUrl]: ${response.status}. ${response.statusText}.`);
  }

  const data = await response.json();

  return data;
};

export const deleteMajorCall = async (id: string): Promise<void> => {
  const deleteMajorUrl = new URL(environment.KIOSK_API_URL + '/majors/' + id);

  const response = await fetch(deleteMajorUrl, {
    method: HTTP_METHOD.DELETE,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`[deleteMajorUrl]: ${response.status}. ${response.statusText}.`);
  }

  return;
};

export const updateMajorCall = async (id: string, body: CreateMajorRequestDto): Promise<Major> => {
  const updateMajorUrl = new URL(environment.KIOSK_API_URL + '/majors/' + id);

  const response = await fetch(updateMajorUrl, {
    method: HTTP_METHOD.PUT,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`[updateMajorUrl]: ${response.status}. ${response.statusText}.`);
  }

  const data = await response.json();

  return data;
};
