import { useMemo } from 'react';
import { useSearchParamsContext } from '../../../providers/searchParamsProvider';

export const PAGE_QUERY_PARAM = 'page';
export const PAGE_SIZE_QUERY_PARAM = 'page-size';

const usePaginationParams = (pageSizes: number[]) => {
  const { handleGetSearchParam } = useSearchParamsContext();

  const page = Number(handleGetSearchParam(PAGE_QUERY_PARAM)) || 1;

  const pageSize = Number(handleGetSearchParam(PAGE_SIZE_QUERY_PARAM)) ?? pageSizes[0];

  const params = useMemo(
    () => ({
      page,
      pageSize,
    }),
    [page, pageSize],
  );

  return params;
};

export default usePaginationParams;
