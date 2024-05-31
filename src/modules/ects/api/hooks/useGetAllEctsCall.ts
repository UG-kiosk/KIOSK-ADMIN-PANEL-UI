import { useQuery } from '@tanstack/react-query';
import { useSearchParamsContext } from '../../../../providers/searchParamsProvider';
import { Degree } from '../../../../shared/constants/degree';
import {
  PAGE_PARAM_NAME,
  FILTER_PARAM_NAME,
  SORT_PARAM_NAME,
  DEGREE_PARAM_NAME,
} from '../../ectsMainPage/components/useSearch';
import { isSort, isDegree } from '../../ectsMainPage/helpers/sortHelpers';
import { fetchEctsSubjects } from '../api';
import useDeleteEcts from './useDeleteEcts';

const useGetAllEctsCall = () => {
  const { deleteEctsSubjectMutation } = useDeleteEcts();
  const { handleGetSearchParam } = useSearchParamsContext();
  const pageParam = Number(handleGetSearchParam(PAGE_PARAM_NAME)) ?? 1;
  const filterParam = handleGetSearchParam(FILTER_PARAM_NAME) ?? null;
  const sortParam = isSort(handleGetSearchParam(SORT_PARAM_NAME) || 'Asc');
  const degreeParam = isDegree(handleGetSearchParam(DEGREE_PARAM_NAME) || Degree.BACHELOR);

  const { data: ectsSubjectData } = useQuery({
    queryKey: ['getEctsData', pageParam, filterParam, sortParam, degreeParam, deleteEctsSubjectMutation],
    queryFn: async () =>
      fetchEctsSubjects({
        itemsPerPage: 20,
        page: pageParam,
        filterBy: filterParam,
        sortDirection: sortParam,
        degree: degreeParam,
      }),
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

export default useGetAllEctsCall;
