import { useMutation } from '@tanstack/react-query';
import { useRefreshTokenCall } from '../../../auth/useRefreshTokenCall';
import { updatePassword } from '../api';
import { toast } from 'react-toastify';
import { Messages } from '../../../../shared/constants/messages';
import { errorToastConfig, successToastConfig } from '../../../../shared/constants/toastTypes';

export const useChangePasswordCall = () => {
  const { ensureValidAccessToken } = useRefreshTokenCall();
  const { mutateAsync: changePasswordMutation } = useMutation({
    mutationKey: [],
    mutationFn: async (credentials: { oldPassword: string; newPassword: string }) => {
      await ensureValidAccessToken();
      return await updatePassword(credentials);
    },
    onError: () => toast.error(Messages.ERROR, errorToastConfig),
    onSuccess: () => toast.success(Messages.ADDED, successToastConfig),
  });

  return { changePasswordMutation };
};
