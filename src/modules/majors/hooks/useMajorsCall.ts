import { useMutation } from '@tanstack/react-query';
import { createMajorCall } from '../api/api';
import { CreateMajorRequestDto } from '../types/major';
import { Messages } from '../../../shared/constants/messages';
import { toast } from 'react-toastify';

export const useMajorsCall = () => {
  const { mutateAsync: createMajorsMutation } = useMutation({
    mutationKey: [],
    mutationFn: async (majors: CreateMajorRequestDto[]) => await createMajorCall(majors),
    onError: () => toast(Messages.ERROR),
    onSuccess: () => toast(Messages.ADDED),
  });

  return { createMajorsMutation };
};
