import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteEctsSubject } from '../api';
import { Messages } from '../../../../shared/constants/messages';
import { toast } from 'react-toastify';

const useDeleteEcts = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: deleteEctsSubjectMutation } = useMutation({
    mutationKey: [],
    mutationFn: async (id: string) => await deleteEctsSubject(id),
    onError: () => toast(Messages.ERROR),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getEctsData'] });
      toast(Messages.DELETED);
    },
  });

  return { deleteEctsSubjectMutation };
};
export default useDeleteEcts;
