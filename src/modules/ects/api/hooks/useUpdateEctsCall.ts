import { useMutation } from '@tanstack/react-query';
import { updateEctsSubject } from '../api';
import { EctsSubject } from '../../types/ectsSubject';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../../../router/paths';
import { toast } from 'react-toastify';
import { Messages } from '../../../../shared/constants/messages';

const useUpdateEctsCall = () => {
  const navigate = useNavigate();
  const { mutateAsync: updateEctsSubjectMutation } = useMutation({
    mutationFn: async (ectsSubject: EctsSubject) => await updateEctsSubject(ectsSubject),
    onError: () => toast(Messages.ERROR),
    onSuccess: () => {
      navigate(`/${paths.ects}`);
      toast(Messages.UPDATED);
    },
  });

  return { updateEctsSubjectMutation };
};

export default useUpdateEctsCall;
