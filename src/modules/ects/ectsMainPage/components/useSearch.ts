import { RefObject } from 'react';
import { useSearchParamsContext } from '../../../../providers/searchParamsProvider';
import { isDegree, isSort, setSort } from '../helpers/sortHelpers';
import { Degree } from '../../../../shared/constants/degree';

export const SORT_PARAM_NAME = 'sort-direction';
export const DEGREE_PARAM_NAME = 'degree';
export const PAGE_PARAM_NAME = 'page';
export const FILTER_PARAM_NAME = 'filter-value';

const useSearch = () => {
  const { handleGetSearchParam, handleSetSearchParam } = useSearchParamsContext();
  const sortParam = isSort(handleGetSearchParam(SORT_PARAM_NAME) || 'Asc');
  const degreeParam = isDegree(handleGetSearchParam(DEGREE_PARAM_NAME) || Degree.BACHELOR);

  const setSortDirectionParam = () => {
    handleSetSearchParam(PAGE_PARAM_NAME, '1');
    handleSetSearchParam(SORT_PARAM_NAME, setSort(sortParam));
  };

  const setDegreeParam = (degree: Degree) => {
    handleSetSearchParam(PAGE_PARAM_NAME, '1');
    handleSetSearchParam(DEGREE_PARAM_NAME, degree);
  };

  const setFilter = (inputRef: RefObject<HTMLInputElement>) => {
    const searchValue = inputRef.current?.value;

    searchValue && handleSetSearchParam(FILTER_PARAM_NAME, searchValue);
    handleSetSearchParam(PAGE_PARAM_NAME, '1');
  };

  return { setFilter, setSortDirectionParam, setDegreeParam, sortParam, degreeParam };
};

export default useSearch;
