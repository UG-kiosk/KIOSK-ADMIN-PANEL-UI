import { useMutation, useQueryClient } from '@tanstack/react-query';
import { NewsRequest } from '../types/news';
import { addNewsCall, deleteNewsCall, updateNewsCall } from '../api/api';
// import { useRefreshTokenCall } from '../../auth/hooks/useRefreshTokenCall';
import { useNavigate } from 'react-router-dom';

export const useNewsCall = () => {
  // const { ensureValidAccessToken } = useRefreshTokenCall();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutateAsync: addNewsMutation } = useMutation({
    mutationKey: ['vehicleSpecification'],
    mutationFn: async (news: NewsRequest) => await addNewsCall(news),
    // onError: () => Toaster here,
    onSuccess: () => {
      navigate('/news');
      return queryClient.invalidateQueries({ queryKey: ['newsList'] });
    },
  });

  const { mutateAsync: deleteNewsMutation } = useMutation({
    mutationKey: ['vehicleSpecification'],
    mutationFn: async (id: string) => {
      // await ensureValidAccessToken();
      return await deleteNewsCall(id);
    },
    // onError: () => Toaster here,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['newsList'] });

      // Toaster here
    },
  });

  const { mutateAsync: updateNewsMutation } = useMutation({
    mutationKey: ['vehicleSpecification'],
    mutationFn: async ({ id, news }: { id: string; news: NewsRequest }) => {
      // await ensureValidAccessToken();
      return await updateNewsCall(id, news);
    },
    // onError: () => Toaster here,
    onSuccess: data => {
      navigate('/news/' + data._id);
      // Toaster here
    },
  });

  return { addNewsMutation, updateNewsMutation, deleteNewsMutation };
};
