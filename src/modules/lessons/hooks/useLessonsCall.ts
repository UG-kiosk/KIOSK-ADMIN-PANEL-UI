import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addLessonsCall, deleteLessonsCall } from '../api/api';
import { LessonPlanRequest } from '../types/lessons';

export const useLessonsCall = () => {
  const queryClient = useQueryClient();

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
      return queryClient.invalidateQueries({ queryKey: ['lessonsList'] });

      // Toaster here
    },
  });

  return { addLessonsMutation, deleteLessonsMutation };
};
