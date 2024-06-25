import { useMutation } from '@tanstack/react-query';
import { addLessonsCall } from '../api/api';
import { LessonPlanRequest } from '../types/lessons';
import { Messages } from '../../../../shared/constants/messages';
import { toast } from 'react-toastify';
import { errorToastConfig, successToastConfig } from '../../../../shared/constants/toastTypes';

export const useLessonsCall = () => {
  const { mutateAsync: addLessonsMutation } = useMutation({
    mutationKey: [],
    mutationFn: async (lessons: LessonPlanRequest) => await addLessonsCall(lessons),
    onError: () => toast.error(Messages.ERROR, errorToastConfig),
    onSuccess: () => toast.success(Messages.ADDED, successToastConfig),
  });

  return { addLessonsMutation };
};
