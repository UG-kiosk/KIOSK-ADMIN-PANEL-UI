import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addLessonsCall, deleteLessonsCall, updateLessonsCall } from '../api/api';
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

  const { mutateAsync: updateLessonsMutation } = useMutation({
    mutationKey: ['vehicleSpecification'],
    mutationFn: async ({ id, lessons }: { id: string; lessons: LessonPlanRequest }) => {
      // await ensureValidAccessToken();
      return await updateLessonsCall(id, lessons);
    },
    // onError: () => Toaster here,
    onSuccess: data => {
      navigate('/lessons/' + data._id);
      return queryClient.invalidateQueries({ queryKey: ['lessonsDetails'] });

      // Toaster here
    },
  });

  return { addLessonsMutation, deleteLessonsMutation, updateLessonsMutation };
};
