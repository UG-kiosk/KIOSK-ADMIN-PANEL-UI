import { useMutation } from '@tanstack/react-query';
import { createMajorCall, deleteMajorCall, updateMajorCall } from '../api/api';
import { CreateMajorRequestDto } from '../types/major';
import { Messages } from '../../../shared/constants/messages';
import { toast } from 'react-toastify';
import { errorToastConfig, successToastConfig } from '../../../shared/constants/toastTypes';
import { useRefreshTokenCall } from '../../auth/useRefreshTokenCall';
import { useNavigate } from 'react-router-dom';

export const useMajorsCall = () => {
  const { ensureValidAccessToken } = useRefreshTokenCall();
  const navigate = useNavigate();

  const { mutateAsync: createMajorsMutation } = useMutation({
    mutationKey: [],
    mutationFn: async (majors: CreateMajorRequestDto[]) => await createMajorCall(majors),
    onError: () => toast.error(Messages.ERROR, errorToastConfig),
    onSuccess: () => toast.success(Messages.ADDED, successToastConfig),
  });

  const { mutateAsync: deleteMajorMutation } = useMutation({
    mutationKey: [],
    mutationFn: async (id: string) => {
      await ensureValidAccessToken();
      return await deleteMajorCall(id);
    },
    // onError: () => Toaster here,
    onSuccess: () => {
      navigate('/majors');
      // Toaster here
    },
  });

  const { mutateAsync: updateMajorMutation } = useMutation({
    mutationKey: [],
    mutationFn: async ({ id, major }: { id: string; major: CreateMajorRequestDto }) => {
      await ensureValidAccessToken();
      return await updateMajorCall(id, major);
    },
    // onError: () => Toaster here,
    onSuccess: data => {
      navigate('/staff/' + data._id);
      // Toaster here
    },
  });

  return { createMajorsMutation, deleteMajorMutation, updateMajorMutation };
};
