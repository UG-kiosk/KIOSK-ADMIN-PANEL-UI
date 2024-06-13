import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addLessonsCall, deleteLessonsCall, updateLessonsCall } from '../api/api';
import { LessonPlanRequest } from '../types/lessons';
import { useNavigate } from 'react-router-dom';
import { useRefreshTokenCall } from '../../auth/useRefreshTokenCall';
import { toast } from 'react-toastify';
import { Messages } from '../../../shared/constants/messages';

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
    onError: () => toast(Messages.ERROR),
    onSuccess: () => {
      navigate('/lessons');
      queryClient.invalidateQueries({ queryKey: ['lessonsList'] });
      toast(Messages.ADDED);
    },
  });

  const { mutateAsync: deleteLessonsMutation } = useMutation({
    mutationKey: ['lessonsSpecification'],
    mutationFn: async (id: string) => {
      await ensureValidAccessToken();
      return await deleteLessonsCall(id);
    },
    onError: () => toast(Messages.ERROR),
    onSuccess: () => {
      navigate('/lessons');
      toast(Messages.DELETED);
      return queryClient.invalidateQueries({ queryKey: ['lessonsList'] });
    },
  });

  const { mutateAsync: updateLessonsMutation } = useMutation({
    mutationKey: ['vehicleSpecification'],
    mutationFn: async ({ id, lessons }: { id: string; lessons: LessonPlanRequest }) => {
      await ensureValidAccessToken();
      return await updateLessonsCall(id, lessons);
    },
    onError: () => toast(Messages.ERROR),
    onSuccess: data => {
      navigate('/lessons/' + data._id);
      toast(Messages.UPDATED);

      return queryClient.invalidateQueries({ queryKey: ['lessonsDetails'] });
    },
  });

  return { addLessonsMutation, deleteLessonsMutation, updateLessonsMutation };
};
