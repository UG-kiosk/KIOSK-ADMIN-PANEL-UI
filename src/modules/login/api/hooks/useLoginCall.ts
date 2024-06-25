import { useMutation } from '@tanstack/react-query';
import { AdminLogin } from '../../types/AdminLogin';
import { useContext } from 'react';
import { AuthContext } from '../../../../providers/context/AuthContextProvider';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';
import { toast } from 'react-toastify';
import { Messages } from '../../../../shared/constants/messages';
import { errorToastConfig } from '../../../../shared/constants/toastTypes';

export const useLoginCall = () => {
  const authContext = useContext(AuthContext);
  const { setUser } = authContext!;

  const navigate = useNavigate();

  const { mutateAsync: loginMutation } = useMutation({
    mutationKey: [],
    mutationFn: async (credentials: AdminLogin) => await login(credentials),
    onError: () => {
      navigate('/auth/login');
      toast.error(Messages.ERROR, errorToastConfig);
    },
    onSuccess: (data: { accessToken: string }): void => {
      const { username }: { username: string } = jwtDecode(data.accessToken);
      setUser({ username: username, accessToken: data.accessToken });
      localStorage.setItem('token', data.accessToken);
      navigate('/');
    },
  });

  return { loginMutation };
};
