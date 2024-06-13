import { useQuery } from '@tanstack/react-query';
import { useSearchParamsContext } from '../../../providers/searchParamsProvider';
import { Degree } from '../../../shared/constants/degree';
import { DEGREE_PARAM_NAME, FILTER_PARAM_NAME } from './useSearch';
import { getAllMajorsCall } from '../api/api';
import { Language } from '../../../shared/constants/language';
import { isDegree } from '../helpers/paramsHelpers';
import { Major } from '../types/major';

export const useMajorsPage = () => {
  const { handleGetSearchParam } = useSearchParamsContext();

  const filterParam = handleGetSearchParam(FILTER_PARAM_NAME) ?? '';
  const degreeParam = isDegree(handleGetSearchParam(DEGREE_PARAM_NAME) || Degree.BACHELOR);

  const { data: majorsResponse } = useQuery({
    queryKey: ['majorsList', filterParam, degreeParam],
    queryFn: async () => {
      return await getAllMajorsCall({ name: filterParam, degree: degreeParam, language: Language.PL });
    },
    select: (data: Major[]) => ({
      majors: data,
    }),
  });

  return {
    majorsList: majorsResponse?.majors,
  };
};
