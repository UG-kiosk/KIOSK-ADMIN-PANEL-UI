import { useMutation } from '@tanstack/react-query';
import { addEctsSubjectCall } from '../api';
import { EctsSubject } from '../../types/ectsSubject';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Messages } from '../../../../shared/constants/messages';

const useAddEctsCall = () => {
  const navigate = useNavigate();
  const { mutateAsync: addEctsSubjectMutation } = useMutation({
    mutationFn: async (ectsSubject: EctsSubject) => await addEctsSubjectCall(ectsSubject),
    onError: () => toast(Messages.ERROR),
    onSuccess: () => {
      navigate(-1);
      toast(Messages.ADDED);
    },
  });

  return { addEctsSubjectMutation };
};

export default useAddEctsCall;
