import { useContext } from 'react';
import { AuthContext } from '../../../providers/context/AuthContextProvider';
import { jwtDecode } from 'jwt-decode';

export const useDecode = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('useDecode must be used within a AuthContextProvider');
  }

  const checkIfExpired = (accessToken: string) => {
    const { exp }: { exp: number } = jwtDecode(accessToken);
    if (exp < new Date().getTime() / 1000) {
      return true;
    }
    return false;
  };

  return { checkIfExpired };
};
