import { useMutation } from '@tanstack/react-query';
import { addStaffCall, updateStaffCall, deleteStaffCall } from '../api';
import { Academic } from '../../types/Academic';
import { useRefreshTokenCall } from '../../../auth/useRefreshTokenCall';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Messages } from '../../../../shared/constants/messages';
import { errorToastConfig, successToastConfig } from '../../../../shared/constants/toastTypes';

export const useStaffCall = () => {
  const { ensureValidAccessToken } = useRefreshTokenCall();
  const navigate = useNavigate();
  const { mutateAsync: addStaffMutation } = useMutation({
    mutationKey: [],
    mutationFn: async (academic: Academic) => {
      await ensureValidAccessToken();
      return await addStaffCall(academic);
    },
    onError: () => toast.error(Messages.ERROR, errorToastConfig),
    onSuccess: () => {
      navigate('/staff');
      toast.success(Messages.ADDED, successToastConfig);
    },
  });

  const { mutateAsync: updateStaffMemberMutation } = useMutation({
    mutationKey: [],
    mutationFn: async ({ id, academic }: { id: string; academic: Academic }) => {
      await ensureValidAccessToken();
      return await updateStaffCall(id, academic);
    },
    onError: () => toast.error(Messages.ERROR, errorToastConfig),
    onSuccess: data => {
      navigate('/staff/' + data._id);
      toast.success(Messages.UPDATED, successToastConfig);
    },
  });

  const { mutateAsync: deleteStaffMutation } = useMutation({
    mutationKey: [],
    mutationFn: async (id: string) => {
      await ensureValidAccessToken();
      return await deleteStaffCall(id);
    },
    onError: () => toast.error(Messages.ERROR, errorToastConfig),
    onSuccess: () => {
      navigate('/staff');
      toast.success(Messages.DELETED, successToastConfig);
    },
  });

  return { addStaffMutation, updateStaffMemberMutation, deleteStaffMutation };
};
