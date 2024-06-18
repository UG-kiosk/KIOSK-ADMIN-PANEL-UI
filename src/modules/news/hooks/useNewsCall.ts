import { useMutation, useQueryClient } from '@tanstack/react-query';
import { NewsRequest } from '../types/news';
import { addNewsCall, deleteNewsCall, updateNewsCall } from '../api/api';
import { useRefreshTokenCall } from '../../auth/useRefreshTokenCall';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Messages } from '../../../shared/constants/messages';

export const useNewsCall = () => {
  const { ensureValidAccessToken } = useRefreshTokenCall();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutateAsync: addNewsMutation } = useMutation({
    mutationKey: ['newsSpecification'],
    mutationFn: async (news: NewsRequest) => {
      await ensureValidAccessToken();
      return await addNewsCall(news);
    },
    onError: () => toast(Messages.ERROR),
    onSuccess: () => {
      navigate('/news');
      queryClient.invalidateQueries({ queryKey: ['newsList'] });
      toast(Messages.ADDED);
    },
  });

  const { mutateAsync: deleteNewsMutation } = useMutation({
    mutationKey: ['newsSpecification'],
    mutationFn: async (id: string) => {
      await ensureValidAccessToken();
      return await deleteNewsCall(id);
    },
    onError: () => toast(Messages.ERROR),
    onSuccess: () => {
      navigate('/news');
      toast(Messages.DELETED);
      return queryClient.invalidateQueries({ queryKey: ['newsList'] });
    },
  });

  const { mutateAsync: updateNewsMutation } = useMutation({
    mutationKey: ['newsSpecification'],
    mutationFn: async ({ id, news }: { id: string; news: NewsRequest }) => {
      await ensureValidAccessToken();
      return await updateNewsCall(id, news);
    },
    onError: () => toast(Messages.ERROR),
    onSuccess: data => {
      navigate('/news/' + data._id);
      toast(Messages.UPDATED);
      return queryClient.invalidateQueries({ queryKey: ['newsDetails'] });
    },
  });

  return { addNewsMutation, updateNewsMutation, deleteNewsMutation };
};
