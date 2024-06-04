import { HTTP_METHOD } from '../../../shared/constants/httpMethods';
import { getAuthHeader } from '../../../shared/utils/getAuthHeader';
import { Admin } from '../types/Admin';

export const register = async (body: Admin): Promise<{ message: string }> => {
  const authApiUrl = 'http://localhost:3000/api/register';

  const response = await fetch(authApiUrl, {
    method: HTTP_METHOD.POST,
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthHeader(),
    },
    credentials: 'include',
    body: JSON.stringify(body),
  });

  return response.json();
};

export const updatePassword = async (body: {
  oldPassword: string;
  newPassword: string;
}): Promise<{ message: string }> => {
  const authApiUrl = 'http://localhost:3000/api/change-password';

  const response = await fetch(authApiUrl, {
    method: HTTP_METHOD.PATCH,
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthHeader(),
    },
    credentials: 'include',
    body: JSON.stringify(body),
  });

  return response.json();
};
