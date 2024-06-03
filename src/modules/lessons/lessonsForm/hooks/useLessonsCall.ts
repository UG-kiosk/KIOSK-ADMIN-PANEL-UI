import { useMutation } from '@tanstack/react-query';
import { addLessonsCall } from '../api/api';
import { LessonPlanRequest } from '../types/lessons';
import { Messages } from '../../../../shared/constants/messages';
import { toast } from 'react-toastify';

export const useLessonsCall = () => {
  const { mutateAsync: addLessonsMutation } = useMutation({
    mutationKey: [],
    mutationFn: async (lessons: LessonPlanRequest) => await addLessonsCall(lessons),
    onError: () => toast(Messages.ERROR),
    onSuccess: () => toast(Messages.ADDED),
  });

  return { addLessonsMutation };
};
