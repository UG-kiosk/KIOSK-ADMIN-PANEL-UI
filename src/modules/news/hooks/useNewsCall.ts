import { useMutation } from '@tanstack/react-query';
import { NewsRequest } from '../types/news';
import { addNewsCall, deleteNewsCall } from '../api/api';
import { useRefreshTokenCall } from '../../auth/hooks/useRefreshTokenCall';
import { useNavigate } from 'react-router-dom';

export const useNewsCall = () => {
  const { ensureValidAccessToken } = useRefreshTokenCall();
  const navigate = useNavigate();
  const { mutateAsync: addNewsMutation } = useMutation({
    mutationKey: ['vehicleSpecification'],
    mutationFn: async (news: NewsRequest) => await addNewsCall(news),
    // onError: () => Toaster here,
    // onSuccess: data => Toaster here,
  });

  const { mutateAsync: deleteNewsMutation } = useMutation({
    mutationKey: ['vehicleSpecification'],
    mutationFn: async (id: string) => {
      // await ensureValidAccessToken();
      return await deleteNewsCall(id);
    },
    // onError: () => Toaster here,
    onSuccess: () => {
      navigate('/news');
      // Toaster here
    },
  });

  return { addNewsMutation, deleteNewsMutation };
};
