import { useContext } from 'react';
import { AuthContext } from '../../../../providers/context/AuthContextProvider';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api';
import { toast } from 'react-toastify';
import { Messages } from '../../../../shared/constants/messages';
import { errorToastConfig } from '../../../../shared/constants/toastTypes';

export const useLogoutCall = () => {
  const authContext = useContext(AuthContext);
  const { setUser } = authContext!;
  const navigate = useNavigate();

  const { mutateAsync: logoutMutation } = useMutation({
    mutationKey: [],
    mutationFn: async () => await logout(),
    onError: () => toast.error(Messages.ERROR, errorToastConfig),
    onSuccess: () => {
      setUser({ username: null, accessToken: null });
      localStorage.removeItem('token');
      navigate('/auth/login');
    },
  });

  return { logoutMutation };
};
