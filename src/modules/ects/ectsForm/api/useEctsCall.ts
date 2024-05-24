import { useMutation } from '@tanstack/react-query';
import { addEctsSubjectCall } from './api';
import { EctsSubject } from '../../types/ectsSubject';
// import { useRefreshTokenCall } from '../../../auth/hooks/useRefreshTokenCall';

export const useEctsCall = () => {
  // const { ensureValidAccessToken } = useRefreshTokenCall();
  const { mutateAsync: addEctsSubjectMutation } = useMutation({
    mutationKey: ['vehicleSpecification'],
    mutationFn: async (ectsSubject: EctsSubject) => await addEctsSubjectCall(ectsSubject),
    // onError: () => Toaster here,
    // onSuccess: data => Toaster here,
  });

  return { addEctsSubjectMutation };
};
