import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EventRequest } from '../types/events';
import { addEventCall, deleteEventCall, updateEventCall } from '../api/api';
import { useRefreshTokenCall } from '../../auth/useRefreshTokenCall';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Messages } from '../../../shared/constants/messages';

export const useEventCall = () => {
  const { ensureValidAccessToken } = useRefreshTokenCall();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutateAsync: addEventMutation } = useMutation({
    mutationKey: ['eventSpecification'],
    mutationFn: async (event: EventRequest) => {
      await ensureValidAccessToken();
      return await addEventCall(event);
    },
    onError: () => toast(Messages.ERROR),
    onSuccess: () => {
      navigate('/events');
      queryClient.invalidateQueries({ queryKey: ['eventList'] });
      toast(Messages.ADDED);
    },
  });

  const { mutateAsync: deleteEventMutation } = useMutation({
    mutationKey: ['eventSpecification'],
    mutationFn: async (id: string) => {
      await ensureValidAccessToken();
      return await deleteEventCall(id);
    },
    onError: () => toast(Messages.ERROR),
    onSuccess: () => {
      navigate('/events');
      toast(Messages.DELETED);
      return queryClient.invalidateQueries({ queryKey: ['eventList'] });
    },
  });

  const { mutateAsync: updateEventMutation } = useMutation({
    mutationKey: ['eventSpecification'],
    mutationFn: async ({ id, event }: { id: string; event: EventRequest }) => {
      await ensureValidAccessToken();
      return await updateEventCall(id, event);
    },
    onError: () => toast(Messages.ERROR),
    onSuccess: data => {
      navigate('/events/' + data._id);
      toast(Messages.UPDATED);
      return queryClient.invalidateQueries({ queryKey: ['eventDetails'] });
    },
  });

  return { addEventMutation, updateEventMutation, deleteEventMutation };
};
