import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addLessonsCall, deleteLessonsCall } from '../api/api';
import { LessonPlanRequest } from '../types/lessons';
import { useNavigate } from 'react-router-dom';

export const useLessonsCall = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutateAsync: addLessonsMutation } = useMutation({
    mutationKey: ['lessonsSpecification'],
    mutationFn: async (lessons: LessonPlanRequest) => await addLessonsCall(lessons),
    // onError: () => Toaster here,
    // onSuccess: data => Toaster here,
  });

  const { mutateAsync: deleteLessonsMutation } = useMutation({
    mutationKey: ['lessonsSpecification'],
    mutationFn: async (id: string) => {
      // await ensureValidAccessToken();
      return await deleteLessonsCall(id);
    },
    // onError: () => Toaster here,
    onSuccess: () => {
      navigate('/lessons');
      return queryClient.invalidateQueries({ queryKey: ['lessonsList'] });

      // Toaster here
    },
  });

  return { addLessonsMutation, deleteLessonsMutation };
};
