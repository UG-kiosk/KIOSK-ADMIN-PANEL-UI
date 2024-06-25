import { useMutation } from '@tanstack/react-query';
import { updateEctsSubject } from '../api';
import { EctsSubject } from '../../types/ectsSubject';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../../../router/paths';
import { toast } from 'react-toastify';
import { Messages } from '../../../../shared/constants/messages';
import { errorToastConfig, successToastConfig } from '../../../../shared/constants/toastTypes';

const useUpdateEctsCall = () => {
  const navigate = useNavigate();
  const { mutateAsync: updateEctsSubjectMutation } = useMutation({
    mutationFn: async (ectsSubject: EctsSubject) => await updateEctsSubject(ectsSubject),
    onError: () => toast.error(Messages.ERROR, errorToastConfig),
    onSuccess: () => {
      navigate(`/${paths.ects}`);
      toast.success(Messages.UPDATED, successToastConfig);
    },
  });

  return { updateEctsSubjectMutation };
};

export default useUpdateEctsCall;
