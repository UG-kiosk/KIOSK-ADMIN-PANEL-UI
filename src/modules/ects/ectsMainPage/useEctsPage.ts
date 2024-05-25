import { useQuery } from '@tanstack/react-query';
import { useSearchParamsContext } from '../../../providers/searchParamsProvider';
import { fetchEctsSubject } from '../ectsForm/api/api';
import { isDegree, isSort } from './helpers/sortHelpers';
import { Degree } from '../../../shared/constants/degree';
import { DEGREE_PARAM_NAME, FILTER_PARAM_NAME, PAGE_PARAM_NAME, SORT_PARAM_NAME } from './components/useSearch';
// import { useRefreshTokenCall } from '../../auth/hooks/useRefreshTokenCall';

const useMainEctsPage = () => {
  // const { ensureValidAccessToken } = useRefreshTokenCall();
  const { handleGetSearchParam } = useSearchParamsContext();
  const pageParam = Number(handleGetSearchParam(PAGE_PARAM_NAME)) ?? 1;
  const filterParam = handleGetSearchParam(FILTER_PARAM_NAME) ?? null;
  const sortParam = isSort(handleGetSearchParam(SORT_PARAM_NAME) || 'Asc');
  const degreeParam = isDegree(handleGetSearchParam(DEGREE_PARAM_NAME) || Degree.BACHELOR);

  const { data: ectsSubjectData } = useQuery({
    queryKey: ['browseModels', pageParam, filterParam, sortParam, degreeParam],
    queryFn: async () => {
      // await ensureValidAccessToken();
      return await fetchEctsSubject({
        itemsPerPage: 20,
        page: pageParam,
        filterBy: filterParam,
        sortDirection: sortParam,
        degree: degreeParam,
      });
    },
    select: data => ({
      ectsSubjects: data.ectsSubjects,
      pagination: data.pagination,
    }),
  });

  const totalPages = ectsSubjectData?.pagination.totalPages ?? 0;
  const itemsPerPage = ectsSubjectData?.pagination.itemsPerPage ?? 0;

  return {
    itemsPerPage,
    totalPages,
    ectsSubject: ectsSubjectData?.ectsSubjects,
  };
};

export default useMainEctsPage;
