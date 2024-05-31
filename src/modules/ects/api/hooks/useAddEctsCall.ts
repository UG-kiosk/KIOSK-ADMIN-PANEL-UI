import { useMutation } from '@tanstack/react-query';
import { addEctsSubjectCall } from '../api';
import { EctsSubject } from '../../types/ectsSubject';
import { useNavigate } from 'react-router-dom';

const useAddEctsCall = () => {
  const navigate = useNavigate();
  const { mutateAsync: addEctsSubjectMutation } = useMutation({
    mutationFn: async (ectsSubject: EctsSubject) => await addEctsSubjectCall(ectsSubject),
    // onError: () => Toaster here,
    onSuccess: () => navigate(-1),
  });

  return { addEctsSubjectMutation };
};

export default useAddEctsCall;
