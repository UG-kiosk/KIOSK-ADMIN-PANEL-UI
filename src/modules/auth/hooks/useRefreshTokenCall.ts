import { useMutation } from '@tanstack/react-query';
import { refreshToken } from '../api/api';
import { useContext } from 'react';
import { AuthContext } from '../../../providers/context/AuthContextProvider';
import { jwtDecode } from 'jwt-decode';
import { checkIfTokenExpired } from '../../../shared/utils/checkIfTokenExpired';
import Cookies from 'js-cookie';

export const useRefreshTokenCall = () => {
  const authContext = useContext(AuthContext);
  const { setUser } = authContext!;

  const { mutateAsync: refreshTokenMutation } = useMutation({
    mutationKey: ['vehicleSpecification'],
    mutationFn: async () => await refreshToken(),
    onError: () => console.log('Unauthorized'), // TO DO
    onSuccess: (data: { accessToken: string }): void => {
      console.log('refresh token success doing sth');
      const { username }: { username: string } = jwtDecode(data.accessToken);
      setUser({ username: username, accessToken: data.accessToken });
      Cookies.set('accessToken', data.accessToken, {
        secure: true,
        sameSite: 'strict',
      });
    },
  });

  const ensureValidAccessToken = async () => {
    let token = Cookies.get('accessToken');
    if (!token) {
      await refreshTokenMutation();
    } else if (checkIfTokenExpired(token)) {
      await refreshTokenMutation();
    }
  };

  return { refreshTokenMutation, ensureValidAccessToken };
};
