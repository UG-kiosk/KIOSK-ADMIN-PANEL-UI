import { useMutation } from '@tanstack/react-query';
import { addStaffCall, updateStaffCall, deleteStaffCall } from '../api';
import { Academic } from '../../types/Academic';
import { useRefreshTokenCall } from '../../../auth/useRefreshTokenCall';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Messages } from '../../../../shared/constants/messages';

export const useStaffCall = () => {
  const { ensureValidAccessToken } = useRefreshTokenCall();
  const navigate = useNavigate();
  const { mutateAsync: addStaffMutation } = useMutation({
    mutationKey: [],
    mutationFn: async (academic: Academic) => {
      await ensureValidAccessToken();
      return await addStaffCall(academic);
    },
    onError: () => toast(Messages.ERROR),
    onSuccess: () => {
      navigate('/staff');
      toast(Messages.ADDED);
    },
  });

  const { mutateAsync: updateStaffMemberMutation } = useMutation({
    mutationKey: [],
    mutationFn: async ({ id, academic }: { id: string; academic: Academic }) => {
      await ensureValidAccessToken();
      return await updateStaffCall(id, academic);
    },
    // onError: () => Toaster here,
    onSuccess: data => {
      navigate('/staff/' + data._id);
      // Toaster here
    },
  });

  const { mutateAsync: deleteStaffMutation } = useMutation({
    mutationKey: [],
    mutationFn: async (id: string) => {
      await ensureValidAccessToken();
      return await deleteStaffCall(id);
    },
    // onError: () => Toaster here,
    onSuccess: () => {
      navigate('/staff');
      // Toaster here
    },
  });

  return { addStaffMutation, updateStaffMemberMutation, deleteStaffMutation };
};
