import { RefObject } from 'react';
import { useSearchParamsContext } from '../../../../../providers/searchParamsProvider';

export const PAGE_PARAM_NAME = 'page';
export const FILTER_PARAM_NAME = 'name';

const useSearch = () => {
  const { handleSetSearchParam } = useSearchParamsContext();

  const setFilter = (inputRef: RefObject<HTMLInputElement>) => {
    const searchValue = inputRef.current?.value;

    (searchValue || searchValue == '') && handleSetSearchParam(FILTER_PARAM_NAME, searchValue);
    handleSetSearchParam(PAGE_PARAM_NAME, '1');
  };

  return { setFilter };
};

export default useSearch;
