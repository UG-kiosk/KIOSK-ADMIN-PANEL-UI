import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../../providers/context/AuthContextProvider';
import { jwtDecode } from 'jwt-decode';
import { checkIfTokenExpired } from '../../shared/utils/checkIfTokenExpired';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../router/paths';
import { refreshToken } from './api';

export const useRefreshTokenCall = () => {
  const authContext = useContext(AuthContext);
  const { setUser } = authContext!;
  const navigate = useNavigate();

  const { mutateAsync: refreshTokenMutation } = useMutation({
    mutationKey: [],
    mutationFn: async () => await refreshToken(),
    onError: () => navigate(`/${paths.login}`), // TO DO
    onSuccess: (data: { accessToken: string }) => {
      const { username }: { username: string } = jwtDecode(data.accessToken);
      setUser({ username: username, accessToken: data.accessToken });
      localStorage.setItem('token', data.accessToken);
    },
  });

  const ensureValidAccessToken = async () => {
    const token = localStorage.getItem('token');
    if (!token || checkIfTokenExpired(token)) {
      await refreshTokenMutation();
    }
  };

  return { refreshTokenMutation, ensureValidAccessToken };
};
