import { useMutation } from '@tanstack/react-query';
import { register } from '../api/api';
import { useRefreshTokenCall } from './useRefreshTokenCall';
import { Admin } from '../types/Admin';

export const useRegisterCall = () => {
  const { ensureValidAccessToken } = useRefreshTokenCall();
  const { mutateAsync: registerMutation } = useMutation({
    mutationKey: ['vehicleSpecification'],
    mutationFn: async (credentials: Admin) => {
      await ensureValidAccessToken();
      return await register(credentials);
    },
    // onError: () => \\ Toaster here
    // onSuccess: (data: { message: string }): void => {
    // Toaster here
    // },
  });

  return { registerMutation };
};
