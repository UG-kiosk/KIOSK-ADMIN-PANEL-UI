import { RefObject } from 'react';
import { useSearchParamsContext } from '../../../providers/searchParamsProvider';
import { DaysOfWeek } from '../types/lessons';

export const PAGE_PARAM_NAME = 'page';
export const FILTER_PARAM_NAME = 'search';
export const DAY_PARAM_NAME = 'day';

const useSearch = () => {
  const { handleGetSearchParam, handleSetSearchParam } = useSearchParamsContext();
  const dayParam = handleGetSearchParam(DAY_PARAM_NAME) || DaysOfWeek.Monday;

  const setFilter = (inputRef: RefObject<HTMLInputElement>) => {
    const searchValue = inputRef.current?.value;

    (searchValue || searchValue == '') && handleSetSearchParam(FILTER_PARAM_NAME, searchValue);
    handleSetSearchParam(PAGE_PARAM_NAME, '1');
  };
  const setDayParam = (day: DaysOfWeek) => {
    handleSetSearchParam(PAGE_PARAM_NAME, '1');
    handleSetSearchParam(DAY_PARAM_NAME, day);
  };

  return { setFilter, setDayParam, dayParam };
};

export default useSearch;
