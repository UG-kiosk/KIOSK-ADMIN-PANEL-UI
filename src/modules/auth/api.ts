import { HTTP_METHOD } from '../../shared/constants/httpMethods';

export const refreshToken = async (): Promise<{ accessToken: string }> => {
  const authApiUrl = 'http://localhost:3000/api/refresh';

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
