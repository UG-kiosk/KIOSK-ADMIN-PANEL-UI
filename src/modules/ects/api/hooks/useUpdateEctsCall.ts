import { useMutation } from '@tanstack/react-query';
import { updateEctsSubject } from '../api';
import { EctsSubject } from '../../types/ectsSubject';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../../../router/paths';

const useUpdateEctsCall = () => {
  const navigate = useNavigate();
  const { mutateAsync: updateEctsSubjectMutation } = useMutation({
    mutationFn: async (ectsSubject: EctsSubject) => await updateEctsSubject(ectsSubject),
    // onError: () => Toaster here,
    onSuccess: () => navigate(`/${paths.ects}`),
  });

  return { updateEctsSubjectMutation };
};

export default useUpdateEctsCall;
