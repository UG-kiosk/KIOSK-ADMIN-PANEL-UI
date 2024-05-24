import { useMutation } from '@tanstack/react-query';
import { addStaffCall } from '../api/api';
import { Academic } from '../types/Academic';
import { useRefreshTokenCall } from '../../auth/hooks/useRefreshTokenCall';

export const useStaffCall = () => {
  const { ensureValidAccessToken } = useRefreshTokenCall();
  const { mutateAsync: addStaffMutation } = useMutation({
    mutationKey: ['vehicleSpecification'],
    mutationFn: async (academic: Academic) => {
      await ensureValidAccessToken();
      return await addStaffCall(academic);
    },
    // onError: () => Toaster here,
    // onSuccess: data => Toaster here,
  });

  return { addStaffMutation };
};
