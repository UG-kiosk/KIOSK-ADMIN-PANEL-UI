import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addLessonsCall, deleteLessonsCall, updateLessonsCall } from '../api/api';
import { LessonPlanRequest } from '../types/lessons';
import { useNavigate } from 'react-router-dom';
import { useRefreshTokenCall } from '../../auth/useRefreshTokenCall';
import { toast } from 'react-toastify';
import { Messages } from '../../../shared/constants/messages';
import { errorToastConfig, successToastConfig } from '../../../shared/constants/toastTypes';

export const useLessonsCall = () => {
  const { ensureValidAccessToken } = useRefreshTokenCall();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutateAsync: addLessonsMutation } = useMutation({
    mutationKey: ['lessonsSpecification'],
    mutationFn: async (lessons: LessonPlanRequest) => {
      await ensureValidAccessToken();
      return await addLessonsCall(lessons);
    },
    onError: () => toast.error(Messages.ERROR, errorToastConfig),
    onSuccess: () => {
      navigate('/lessons');
      queryClient.invalidateQueries({ queryKey: ['lessonsList'] });
      toast.success(Messages.ADDED, successToastConfig);
    },
  });

  const { mutateAsync: deleteLessonsMutation } = useMutation({
    mutationKey: ['lessonsSpecification'],
    mutationFn: async (id: string) => {
      await ensureValidAccessToken();
      return await deleteLessonsCall(id);
    },
    onError: () => toast.error(Messages.ERROR, errorToastConfig),
    onSuccess: () => {
      navigate('/lessons');
      toast.success(Messages.DELETED, successToastConfig);
      return queryClient.invalidateQueries({ queryKey: ['lessonsList'] });
    },
  });

  const { mutateAsync: updateLessonsMutation } = useMutation({
    mutationKey: ['vehicleSpecification'],
    mutationFn: async ({ id, lessons }: { id: string; lessons: LessonPlanRequest }) => {
      await ensureValidAccessToken();
      return await updateLessonsCall(id, lessons);
    },
    onError: () => toast.error(Messages.ERROR, errorToastConfig),
    onSuccess: data => {
      navigate('/lessons/' + data._id);
      toast.success(Messages.UPDATED, successToastConfig);

      return queryClient.invalidateQueries({ queryKey: ['lessonsDetails'] });
    },
  });

  return { addLessonsMutation, deleteLessonsMutation, updateLessonsMutation };
};
