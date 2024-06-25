import { useSearchParamsContext } from '../../../providers/searchParamsProvider';
import { isDegree } from '../helpers/paramsHelpers';
import { Degree } from '../../../shared/constants/degree';

export const DEGREE_PARAM_NAME = 'degree';
export const FILTER_PARAM_NAME = 'filter-value';

const useSearch = () => {
  const { handleSetSearchParam, handleGetSearchParam } = useSearchParamsContext();
  const degreeParam = isDegree(handleGetSearchParam(DEGREE_PARAM_NAME) || undefined);

  const setDegreeParam = (degree?: Degree) => {
    if (!degree) {
      return;
    }

    handleSetSearchParam(DEGREE_PARAM_NAME, degree);
  };

  const setFilter = (searchValue?: string) => {
    (searchValue || searchValue == '') && handleSetSearchParam(FILTER_PARAM_NAME, searchValue);
  };

  return { setFilter, degreeParam, setDegreeParam };
};

export default useSearch;
