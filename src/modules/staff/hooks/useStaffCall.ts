import { useMutation } from '@tanstack/react-query';
import { addStaffCall, updateStaffCall, deleteStaffCall } from '../api/api';
import { Academic } from '../types/academic';
import { useRefreshTokenCall } from '../../auth/hooks/useRefreshTokenCall';
import { useNavigate } from 'react-router-dom';

export const useStaffCall = () => {
  const { ensureValidAccessToken } = useRefreshTokenCall();
  const navigate = useNavigate();
  const { mutateAsync: addStaffMutation } = useMutation({
    mutationKey: ['vehicleSpecification'],
    mutationFn: async (academic: Academic) => {
      await ensureValidAccessToken();
      return await addStaffCall(academic);
    },
    // onError: () => Toaster here,
    onSuccess: () => {
      navigate('/staff');
    },
  });

  const { mutateAsync: updateStaffMemberMutation } = useMutation({
    mutationKey: ['vehicleSpecification'],
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
    mutationKey: ['vehicleSpecification'],
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
