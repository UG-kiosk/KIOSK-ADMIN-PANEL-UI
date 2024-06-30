import { useMutation } from '@tanstack/react-query';
import { addEctsSubjectCall } from '../api';
import { EctsSubject } from '../../types/ectsSubject';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Messages } from '../../../../shared/constants/messages';
import { errorToastConfig, successToastConfig } from '../../../../shared/constants/toastTypes';

const useAddEctsCall = () => {
  const navigate = useNavigate();
  const { mutateAsync: addEctsSubjectMutation } = useMutation({
    mutationFn: async (ectsSubject: EctsSubject) => await addEctsSubjectCall(ectsSubject),
    onError: () => toast.error(Messages.ERROR, errorToastConfig),
    onSuccess: () => {
      navigate(-1);
      toast.success(Messages.ADDED, successToastConfig);
    },
  });

  return { addEctsSubjectMutation };
};

export default useAddEctsCall;
