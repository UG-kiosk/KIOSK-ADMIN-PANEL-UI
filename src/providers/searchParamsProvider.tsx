import { createContext, PropsWithChildren, useCallback, useContext, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

type SearchParamsContextType = {
  handleGetSearchParam: (name: string) => string | null;
  handleRemoveSearchParam: (name: string) => void;
  handleSetSearchParam: (name: string, value: string) => void;
  searchParams: URLSearchParams;
};
const SearchParamsContext = createContext<SearchParamsContextType | undefined>(undefined);

type SearchParamsProviderType = PropsWithChildren;
const SearchParamsProvider = ({ children }: SearchParamsProviderType) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleGetSearchParam = useCallback((name: string) => searchParams.get(name), [searchParams]);

  const handleRemoveSearchParam = useCallback(
    (name: string) => {
      searchParams.delete(name);
      setSearchParams(searchParams, { replace: true });
    },
    [searchParams, setSearchParams],
  );

  const handleSetSearchParam = useCallback(
    (name: string, value: string) => {
      searchParams.set(name, value);
      setSearchParams(searchParams, { replace: true });
    },
    [searchParams, setSearchParams],
  );

  const value: SearchParamsContextType = useMemo(
    () => ({
      handleGetSearchParam,
      handleRemoveSearchParam,
      handleSetSearchParam,
      searchParams,
    }),
    [handleGetSearchParam, handleRemoveSearchParam, handleSetSearchParam, searchParams],
  );

  return <SearchParamsContext.Provider value={value}>{children}</SearchParamsContext.Provider>;
};

const useSearchParamsContext = () => {
  const context = useContext(SearchParamsContext);
  if (!context) {
    throw new Error('useSearchParamsContext must be used within SearchParamsProvider.');
  }
  return context;
};

export { SearchParamsProvider, useSearchParamsContext };
export type { SearchParamsContextType };
