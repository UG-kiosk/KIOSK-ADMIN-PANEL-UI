import { HTTP_METHOD } from '../../../shared/constants/httpMethods';
import { Academic } from '../types/academic';

export const addStaffCall = async (body: Academic): Promise<Academic> => {
  const addStaffUrl = new URL('http://localhost:5202/staff');

  const response = await fetch(addStaffUrl, {
    method: HTTP_METHOD.POST,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([body]),
  });

  if (!response.ok) {
    throw new Error(`[addStaffUrl]: ${response.status}. ${response.statusText}.`);
  }

  const data = await response.json();

  return data;
};
