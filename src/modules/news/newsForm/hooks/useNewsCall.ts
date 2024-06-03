import { useMutation } from '@tanstack/react-query';
import { NewsRequest } from '../types/news';
import { addNewsCall } from '../api/api';
import { Messages } from '../../../../shared/constants/messages';
import { toast } from 'react-toastify';

export const useNewsCall = () => {
  const { mutateAsync: addNewsMutation } = useMutation({
    mutationKey: [],
    mutationFn: async (news: NewsRequest) => await addNewsCall(news),
    onError: () => toast(Messages.ERROR),
    onSuccess: () => toast(Messages.ADDED),
  });

  return { addNewsMutation };
};
