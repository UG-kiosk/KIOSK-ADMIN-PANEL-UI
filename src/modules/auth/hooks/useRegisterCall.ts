import { useMutation } from '@tanstack/react-query';
import { register } from '../api/api';
import { useRefreshTokenCall } from './useRefreshTokenCall';

export const useRegisterCall = () => {
  const { ensureValidAccessToken } = useRefreshTokenCall();
  const { mutateAsync: registerMutation } = useMutation({
    mutationKey: ['vehicleSpecification'],
    mutationFn: async (credentials: Admin) => {
      await ensureValidAccessToken();
      return await register(credentials);
    },
    onError: () => console.log('sth went wrong'),
    onSuccess: (data: { message: string }): void => {
      console.log('data', data);
    },
  });

  return { registerMutation };
};
