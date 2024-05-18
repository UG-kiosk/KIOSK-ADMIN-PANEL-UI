import { HTTP_METHOD } from '../../../shared/constants/httpMethods';
// import { Academic } from '../types/Academic';

export const addStaffCall = async (body: unknown): Promise<unknown> => {
  const addStaffUrl = new URL('http://localhost:5202/staff');

  const response = await fetch(addStaffUrl, {
    method: HTTP_METHOD.POST,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`[addStaffUrl]: ${response.status}. ${response.statusText}.`);
  }

  const data = await response.json();

  return data;
};

// // instead use axios
// import axios from 'axios';

// export const addEctsSubjectCall = async (body: Academic): Promise<Academic> => {
//   const addStaffUrl = 'http://localhost:5202/staff';

//   const response = await axios.post(addStaffUrl, body);

//   return response.data;
// };
