import { HTTP_METHOD } from '../../../shared/constants/httpMethods';
import { getAuthHeader } from '../../../shared/utils/getAuthHeader';
import { StaffResponse } from '../types/StaffResponse';
import { Academic } from '../types/Academic';

export const getStaffCall = async (language: string, page: string, name: string): Promise<StaffResponse> => {
  const params = new URLSearchParams({
    language,
    page,
    name,
  });
  const getStaffUrl = new URL(`http://localhost:5202/kiosk-api/staff?${params.toString()}`);

  const response = await fetch(getStaffUrl, {
    method: HTTP_METHOD.GET,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(`[getStaffUrl]: ${response.status}. ${response.statusText}.`);
  }

  const data = await response.json();

  return data;
};

export const getStaffMemberCall = async (id: string): Promise<Academic> => {
  const language = 'PL';
  const getStaffMemberUrl = new URL('http://localhost:5202/kiosk-api/staff/' + id + '?language=' + language);

  const response = await fetch(getStaffMemberUrl, {
    method: HTTP_METHOD.GET,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`[getStaffMemberUrl]: ${response.status}. ${response.statusText}.`);
  }

  const data = await response.json();

  return data;
};

export const addStaffCall = async (body: Academic): Promise<void> => {
  const addStaffUrl = new URL('http://localhost:5202/kiosk-api/staff');

  const response = await fetch(addStaffUrl, {
    method: HTTP_METHOD.POST,
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthHeader(),
    },
    body: JSON.stringify([body]),
  });

  if (!response.ok) {
    throw new Error(`[addStaffUrl]: ${response.status}. ${response.statusText}.`);
  }
};

export const updateStaffCall = async (id: string, body: Academic): Promise<Academic> => {
  const updateStaffUrl = new URL('http://localhost:5202/kiosk-api/staff/' + id);

  const response = await fetch(updateStaffUrl, {
    method: HTTP_METHOD.PUT,
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthHeader(),
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`[updateStaffUrl]: ${response.status}. ${response.statusText}.`);
  }

  const data = await response.json();

  return data;
};

export const deleteStaffCall = async (id: string): Promise<void> => {
  const deleteStaffUrl = new URL('http://localhost:5202/kiosk-api/staff/' + id);

  const response = await fetch(deleteStaffUrl, {
    method: HTTP_METHOD.DELETE,
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthHeader(),
    },
  });

  if (!response.ok) {
    throw new Error(`[deleteStaffUrl]: ${response.status}. ${response.statusText}.`);
  }
};
