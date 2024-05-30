import { useMutation } from '@tanstack/react-query';
import { NewsRequest } from '../types/news';
import { addNewsCall } from '../api/api';

export const useNewsCall = () => {
  const { mutateAsync: addNewsMutation } = useMutation({
    mutationKey: ['vehicleSpecification'],
    mutationFn: async (news: NewsRequest) => await addNewsCall(news),
    // onError: () => Toaster here,
    // onSuccess: data => Toaster here,
  });

  return { addNewsMutation };
};
