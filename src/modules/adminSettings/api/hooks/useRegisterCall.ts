import { useMutation } from '@tanstack/react-query';
import { useRefreshTokenCall } from '../../../auth/useRefreshTokenCall';
import { Admin } from '../../types/Admin';
import { register } from '../api';
import { toast } from 'react-toastify';
import { Messages } from '../../../../shared/constants/messages';

export const useRegisterCall = () => {
  const { ensureValidAccessToken } = useRefreshTokenCall();
  const { mutateAsync: registerMutation } = useMutation({
    mutationKey: [],
    mutationFn: async (credentials: Admin) => {
      await ensureValidAccessToken();
      return await register(credentials);
    },
    onError: () => toast(Messages.ERROR),
    onSuccess: () => toast(Messages.REGISTER),
  });

  return { registerMutation };
};
