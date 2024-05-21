import { useMutation } from '@tanstack/react-query';
import { createMajorCall } from '../api/api';
import { CreateMajorRequestDto } from '../types/major';

export const useMajorsCall = () => {
  const { mutateAsync: createMajorsMutation } = useMutation({
    mutationKey: ['vehicleSpecification'],
    mutationFn: async (majors: CreateMajorRequestDto[]) => await createMajorCall(majors),
    // onError: () => Toaster here,
    // onSuccess: data => Toaster here,
  });

  return { createMajorsMutation };
};
