import { useMutation } from '@tanstack/react-query';
import { updatePassword } from '../api/api';
import { useRefreshTokenCall } from './useRefreshTokenCall';

export const useChangePasswordCall = () => {
  const { ensureValidAccessToken } = useRefreshTokenCall();
  const { mutateAsync: changePasswordMutation } = useMutation({
    mutationKey: ['vehicleSpecification'],
    mutationFn: async (credentials: { oldPassword: string; newPassword: string }) => {
      await ensureValidAccessToken();
      return await updatePassword(credentials);
    },
    // onError: () => console.log('sth went wrong'),
    onSuccess: (data: { message: string }): void => {
      console.log('data', data);
    },
  });

  return { changePasswordMutation };
};
