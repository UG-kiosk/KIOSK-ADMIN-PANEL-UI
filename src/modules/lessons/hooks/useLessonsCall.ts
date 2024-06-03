import { useMutation } from '@tanstack/react-query';
import { addLessonsCall } from '../api/api';
import { LessonPlanRequest } from '../types/lessons';

export const useLessonsCall = () => {
  const { mutateAsync: addLessonsMutation } = useMutation({
    mutationKey: ['vehicleSpecification'],
    mutationFn: async (lessons: LessonPlanRequest) => await addLessonsCall(lessons),
    // onError: () => Toaster here,
    // onSuccess: data => Toaster here,
  });

  return { addLessonsMutation };
};
