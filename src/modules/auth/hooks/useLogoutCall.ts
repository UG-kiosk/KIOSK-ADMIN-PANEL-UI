import { useContext } from 'react';
import { AuthContext } from '../../../providers/context/AuthContextProvider';
import { logout } from '../api/api';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export const useLogoutCall = () => {
  const authContext = useContext(AuthContext);
  const { setUser } = authContext!;
  const navigate = useNavigate();

  const { mutateAsync: logoutMutation } = useMutation({
    mutationKey: ['vehicleSpecification'],
    mutationFn: async () => await logout(),
    onError: () => console.log('Something went wrong'),
    onSuccess: () => {
      setUser({ username: null, accessToken: null });
      Cookies.remove('accessToken');
      navigate('/auth/login');
    },
  });

  return { logoutMutation };
};