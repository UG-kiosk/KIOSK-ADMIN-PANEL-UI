import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteEctsSubject } from '../api';
import { Messages } from '../../../../shared/constants/messages';
import { toast } from 'react-toastify';
import { errorToastConfig, successToastConfig } from '../../../../shared/constants/toastTypes';

const useDeleteEcts = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: deleteEctsSubjectMutation } = useMutation({
    mutationKey: [],
    mutationFn: async (id: string) => await deleteEctsSubject(id),
    onError: () => toast.error(Messages.ERROR, errorToastConfig),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getEctsData'] });
      toast.success(Messages.DELETED, successToastConfig);
    },
  });

  return { deleteEctsSubjectMutation };
};
export default useDeleteEcts;
