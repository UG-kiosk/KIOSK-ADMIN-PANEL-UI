import { jwtDecode } from 'jwt-decode';

export const checkIfTokenExpired = (accessToken: string) => {
  const { exp }: { exp: number } = jwtDecode(accessToken);
  if (exp < new Date().getTime() / 1000) {
    return true;
  }
  return false;
};
