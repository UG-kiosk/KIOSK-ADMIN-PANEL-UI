import { HTTP_METHOD } from '../../../shared/constants/httpMethods';
import { AdminLogin } from '../types/AdminLogin';

export const login = async (body: AdminLogin): Promise<{ username: string; accessToken: string }> => {
  const authApiUrl = 'http://localhost:3000/api/login';

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
  const authApiUrl = 'http://localhost:3000/api/logout';

  await fetch(authApiUrl, {
    method: HTTP_METHOD.DELETE,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
};
