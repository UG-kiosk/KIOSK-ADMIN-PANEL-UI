import { useMutation } from '@tanstack/react-query';
import { useRefreshTokenCall } from '../../../auth/useRefreshTokenCall';
import { updatePassword } from '../api';
import { toast } from 'react-toastify';
import { Messages } from '../../../../shared/constants/messages';

export const useChangePasswordCall = () => {
  const { ensureValidAccessToken } = useRefreshTokenCall();
  const { mutateAsync: changePasswordMutation } = useMutation({
    mutationKey: [],
    mutationFn: async (credentials: { oldPassword: string; newPassword: string }) => {
      await ensureValidAccessToken();
      return await updatePassword(credentials);
    },
    onError: () => toast(Messages.ERROR),
    onSuccess: () => toast(Messages.ADDED),
  });

  return { changePasswordMutation };
};
