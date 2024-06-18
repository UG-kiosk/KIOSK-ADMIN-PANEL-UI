import { useMutation } from '@tanstack/react-query';
import { EventRequest } from '../../types/events';
import { addEventCall } from '../api/api';

export const useEventCall = () => {
  const { mutateAsync: addEventMutation } = useMutation({
    mutationKey: ['event'],
    mutationFn: async (event: EventRequest) => await addEventCall(event),
    // onError: () => Toaster here,
    // onSuccess: data => Toaster here,
  });

  return { addEventMutation };
};
