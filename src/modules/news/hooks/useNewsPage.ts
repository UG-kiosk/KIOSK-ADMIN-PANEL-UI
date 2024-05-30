import { useQuery } from '@tanstack/react-query';
import { getNewsCall } from '../api/api';
import { useSearchParamsContext } from '../../../providers/searchParamsProvider';

const useNewsPage = () => {
  const { handleGetSearchParam } = useSearchParamsContext();

  const pageParam = Number(handleGetSearchParam('page')) ?? 1;
  const sourceParam = handleGetSearchParam('source') ?? '';

  const { data: newsListData } = useQuery({
    queryKey: ['newsList', pageParam, sourceParam],
    queryFn: async () => {
      const page = pageParam === 0 ? 1 : pageParam;
      return await getNewsCall('Pl', page.toString(), sourceParam);
    },
    select: data => ({
      news: data.content,
      pagination: data.pagination,
    }),
  });

  return {
    news: newsListData?.news,
    pagination: newsListData?.pagination,
  };
};

export default useNewsPage;
