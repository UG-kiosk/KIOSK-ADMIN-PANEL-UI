import { useQuery } from '@tanstack/react-query';
import { getEventCall } from '../api/api';
import { useSearchParamsContext } from '../../../providers/searchParamsProvider';

const useEventPage = () => {
  const { handleGetSearchParam } = useSearchParamsContext();

  const pageParam = Number(handleGetSearchParam('page')) ?? 1;
  const searchParam = handleGetSearchParam('search') ?? '';

  const { data: eventListData } = useQuery({
    queryKey: ['eventList', pageParam, searchParam],
    queryFn: async () => {
      const page = pageParam === 0 ? 1 : pageParam;
      return await getEventCall(page.toString(), searchParam);
    },
    select: data => ({
      events: data.content,
      pagination: data.pagination,
    }),
  });

  return {
    events: eventListData?.events,
    pagination: eventListData?.pagination,
  };
};

export default useEventPage;
