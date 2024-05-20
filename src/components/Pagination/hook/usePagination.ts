import { useCallback } from 'react';
import { useSearchParamsContext } from '../../../providers/searchParamsProvider';
import usePaginationParams, { PAGE_QUERY_PARAM, PAGE_SIZE_QUERY_PARAM } from './usePaginationParams';

export type UsePagination = ReturnType<typeof usePagination>;
export type PaginationActions = UsePagination['actions'];
export type PaginationState = UsePagination['state'];

export const FIRST_PAGE = 1;

type UsePaginationArgs = {
  totalPages: number;
  pageSizes: number[];
};
/**
 * usePagination custom hook used to get access into pagination state and actions
 *
 * Returns an object where,
 * * state is an object that includes all pagination state
 * * actions is an object that includes all pagination actions
 */
const usePagination = ({ totalPages, pageSizes }: UsePaginationArgs) => {
  const { handleSetSearchParam } = useSearchParamsContext();
  const { page, pageSize } = usePaginationParams(pageSizes);

  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > FIRST_PAGE;

  const handleGoToNextPage = useCallback(() => {
    if (page >= totalPages) return;
    handleSetSearchParam(PAGE_QUERY_PARAM, String(page + 1));
  }, [handleSetSearchParam, page, totalPages]);

  const handleGoToPreviousPage = useCallback(() => {
    if (page <= FIRST_PAGE) return;
    handleSetSearchParam(PAGE_QUERY_PARAM, String(page - 1));
  }, [handleSetSearchParam, page]);

  const handleGoToPage = useCallback(
    (page: number) => {
      if (page > totalPages || page < FIRST_PAGE) return;
      handleSetSearchParam(PAGE_QUERY_PARAM, String(page));
    },
    [handleSetSearchParam, totalPages],
  );

  const handlePageSizeChange = useCallback(
    (pageSize: number) => {
      handleSetSearchParam(PAGE_SIZE_QUERY_PARAM, String(pageSize));
    },
    [handleSetSearchParam],
  );

  const actions = {
    handleGoToPage,
    handleGoToNextPage,
    handleGoToPreviousPage,
    handlePageSizeChange,
  };

  const state = {
    page,
    pageSize,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  };

  return { state, actions } as const;
};

export default usePagination;
