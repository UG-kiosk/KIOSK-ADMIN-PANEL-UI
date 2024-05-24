import { useContext } from 'react';
import { AuthContext } from '../../../providers/context/AuthContextProvider';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

export const useDecode = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('useDecode must be used within a AuthContextProvider');
  }

  const { setUser } = authContext;
  const decodeSetUser = (accessToken: string) => {
    const { username }: { username: string } = jwtDecode(accessToken);
    setUser({ username: username, accessToken: accessToken });
    Cookies.set('accessToken', accessToken, {
      secure: true,
      sameSite: 'strict',
    });
  };

  const checkIfExpired = (accessToken: string) => {
    const { exp }: { exp: number } = jwtDecode(accessToken);
    if (exp < new Date().getTime() / 1000) {
      return true;
    }
    return false;
  };

  return { decodeSetUser, checkIfExpired };
};
