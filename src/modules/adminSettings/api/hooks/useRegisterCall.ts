import { useMutation } from '@tanstack/react-query';
import { useRefreshTokenCall } from '../../../auth/useRefreshTokenCall';
import { Admin } from '../../types/Admin';
import { register } from '../api';
import { toast } from 'react-toastify';
import { Messages } from '../../../../shared/constants/messages';
import { errorToastConfig, successToastConfig } from '../../../../shared/constants/toastTypes';

export const useRegisterCall = () => {
  const { ensureValidAccessToken } = useRefreshTokenCall();
  const { mutateAsync: registerMutation } = useMutation({
    mutationKey: [],
    mutationFn: async (credentials: Admin) => {
      await ensureValidAccessToken();
      return await register(credentials);
    },
    onError: () => toast.error(Messages.ERROR, errorToastConfig),
    onSuccess: () => toast.success(Messages.REGISTER, successToastConfig),
  });

  return { registerMutation };
};
