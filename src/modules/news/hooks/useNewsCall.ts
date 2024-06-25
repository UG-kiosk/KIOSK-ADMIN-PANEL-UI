import { useMutation, useQueryClient } from '@tanstack/react-query';
import { NewsRequest } from '../types/news';
import { addNewsCall, deleteNewsCall, updateNewsCall } from '../api/api';
// import { useRefreshTokenCall } from '../../auth/hooks/useRefreshTokenCall';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Messages } from '../../../shared/constants/messages';
import { errorToastConfig, successToastConfig } from '../../../shared/constants/toastTypes';

export const useNewsCall = () => {
  // const { ensureValidAccessToken } = useRefreshTokenCall();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutateAsync: addNewsMutation } = useMutation({
    mutationKey: ['vehicleSpecification'],
    mutationFn: async (news: NewsRequest) => await addNewsCall(news),
    onError: () => toast.error(Messages.ERROR, errorToastConfig),
    onSuccess: () => {
      navigate('/news');
      queryClient.invalidateQueries({ queryKey: ['newsList'] });
      toast.success(Messages.ADDED, successToastConfig);
    },
  });

  const { mutateAsync: deleteNewsMutation } = useMutation({
    mutationKey: [],
    mutationFn: async (id: string) => {
      // await ensureValidAccessToken();
      return await deleteNewsCall(id);
    },
    onError: () => toast.error(Messages.ERROR, errorToastConfig),
    onSuccess: () => {
      toast.success(Messages.DELETED, successToastConfig);

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
    onError: () => toast.error(Messages.ERROR, errorToastConfig),
    onSuccess: data => {
      navigate('/news/' + data._id);
      toast.success(Messages.UPDATED, successToastConfig);
    },
  });

  return { addNewsMutation, updateNewsMutation, deleteNewsMutation };
};
