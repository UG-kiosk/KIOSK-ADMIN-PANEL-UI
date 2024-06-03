import { useContext } from 'react';
import { AuthContext } from '../../../../providers/context/AuthContextProvider';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api';

export const useLogoutCall = () => {
  const authContext = useContext(AuthContext);
  const { setUser } = authContext!;
  const navigate = useNavigate();

  const { mutateAsync: logoutMutation } = useMutation({
    mutationKey: [],
    mutationFn: async () => await logout(),
    onError: () => {}, // TO DO
    onSuccess: () => {
      setUser({ username: null, accessToken: null });
      localStorage.removeItem('token');
      navigate('/auth/login');
    },
  });

  return { logoutMutation };
};
