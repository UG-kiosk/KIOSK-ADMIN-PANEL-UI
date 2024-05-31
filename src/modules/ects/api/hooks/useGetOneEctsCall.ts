import { useQuery } from '@tanstack/react-query';
import { useSearchParamsContext } from '../../../../providers/searchParamsProvider';
import { fetchOneEctsSubject } from '../api';

const useGetOneEctsCall = () => {
  const { handleGetSearchParam } = useSearchParamsContext();
  const idParam = handleGetSearchParam('id');

  const { data: ectsOneSubject } = useQuery({
    queryKey: ['getEctsData', idParam],
    queryFn: async () => fetchOneEctsSubject(idParam as string),
    enabled: idParam !== null,
  });

  return { ectsOneSubject, idParam };
};

export default useGetOneEctsCall;
