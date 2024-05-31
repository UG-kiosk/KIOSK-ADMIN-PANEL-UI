import { useMutation } from '@tanstack/react-query';
import { addStaffCall } from '../api/api';
import { Academic } from '../types/academic';

export const useStaffCall = () => {
  const { mutateAsync: addStaffMutation } = useMutation({
    mutationKey: ['vehicleSpecification'],
    mutationFn: async (academic: Academic) => await addStaffCall(academic),
    // onError: () => Toaster here,
    // onSuccess: data => Toaster here,
  });

  return { addStaffMutation };
};
