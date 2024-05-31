import { useMutation } from '@tanstack/react-query';
import { login } from '../api/api';
import { AdminLogin } from '../types/AdminLogin';
import { useContext } from 'react';
import { AuthContext } from '../../../providers/context/AuthContextProvider';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export const useLoginCall = () => {
  const authContext = useContext(AuthContext);
  const { setUser } = authContext!;

  const navigate = useNavigate();

  const { mutateAsync: loginMutation } = useMutation({
    mutationKey: ['vehicleSpecification'],
    mutationFn: async (credentials: AdminLogin) => await login(credentials),
    onError: () => navigate('/auth/login'),
    onSuccess: (data: { accessToken: string }): void => {
      const { username }: { username: string } = jwtDecode(data.accessToken);
      setUser({ username: username, accessToken: data.accessToken });
      localStorage.setItem('token', data.accessToken);
      navigate('/');
    },
  });

  return { loginMutation };
};
