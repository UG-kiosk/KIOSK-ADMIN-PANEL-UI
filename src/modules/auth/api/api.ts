import { HTTP_METHOD } from '../../../shared/constants/httpMethods';
import { getAuthHeader } from '../../../shared/utils/getAuthHeader';
import { AdminLogin } from '../types/AdminLogin';
import { Admin } from '../types/Admin';

export const login = async (body: AdminLogin): Promise<{ username: string; accessToken: string }> => {
  const authApiUrl = 'http://localhost:430/api/login';

  const response = await fetch(authApiUrl, {
    method: HTTP_METHOD.POST,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(body),
  });

  return response.json();
};

export const logout = async (): Promise<void> => {
  const authApiUrl = 'http://localhost:430/api/logout';

  await fetch(authApiUrl, {
    method: HTTP_METHOD.DELETE,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
};

export const register = async (body: Admin): Promise<{ message: string }> => {
  const authApiUrl = 'http://localhost:430/api/register';

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
  const authApiUrl = 'http://localhost:430/api/change-password';

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

export const refreshToken = async (): Promise<{ accessToken: string }> => {
  const authApiUrl = 'http://localhost:430/api/refresh';

  const response = await fetch(authApiUrl, {
    method: HTTP_METHOD.GET,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  const data = await response.json();

  return data;
};
