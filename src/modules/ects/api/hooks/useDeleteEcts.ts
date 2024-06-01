import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteEctsSubject } from '../api';

const useDeleteEcts = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: deleteEctsSubjectMutation } = useMutation({
    mutationKey: ['vehicleSpecification'],
    mutationFn: async (id: string) => await deleteEctsSubject(id),
    // onError: () => Toaster here,
    onSuccess: () => {
      console.log('success');
      return queryClient.invalidateQueries({ queryKey: ['getEctsData'] });
    },
  });

  return { deleteEctsSubjectMutation };
};
export default useDeleteEcts;
