import { RefObject } from 'react';
import { useSearchParamsContext } from '../../../providers/searchParamsProvider';
import { NewsSourceAll } from '../types/news';

export const PAGE_PARAM_NAME = 'page';
export const FILTER_PARAM_NAME = 'search';
export const SOURCE_PARAM_NAME = 'source';

const useSearch = () => {
  const { handleGetSearchParam, handleSetSearchParam } = useSearchParamsContext();
  const sourceParam = handleGetSearchParam(SOURCE_PARAM_NAME) || NewsSourceAll.ALL;

  const setFilter = (inputRef: RefObject<HTMLInputElement>) => {
    const searchValue = inputRef.current?.value;

    (searchValue || searchValue == '') && handleSetSearchParam(FILTER_PARAM_NAME, searchValue);
    handleSetSearchParam(PAGE_PARAM_NAME, '1');
  };

  const setSourceParam = (source: NewsSourceAll) => {
    handleSetSearchParam(PAGE_PARAM_NAME, '1');
    if (source == NewsSourceAll.ALL) {
      handleSetSearchParam(SOURCE_PARAM_NAME, '');
    } else {
      handleSetSearchParam(SOURCE_PARAM_NAME, source);
    }
  };

  return { setFilter, setSourceParam, sourceParam };
};

export default useSearch;
