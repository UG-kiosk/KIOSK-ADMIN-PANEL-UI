import { useQuery } from '@tanstack/react-query';
import { getLessonsCall } from '../api/api';
import { useSearchParamsContext } from '../../../providers/searchParamsProvider';

const useLessonsPage = () => {
  const { handleGetSearchParam } = useSearchParamsContext();

  const pageParam = Number(handleGetSearchParam('page')) ?? 1;

  const { data: lessonsListData } = useQuery({
    queryKey: ['lessonsList', pageParam],
    queryFn: async () => {
      const page = pageParam === 0 ? 1 : pageParam;
      return await getLessonsCall('Pl', page.toString());
    },
    select: data => ({
      lessons: data.content,
      pagination: data.pagination,
    }),
  });

  return {
    lessons: lessonsListData?.lessons,
    pagination: lessonsListData?.pagination,
  };
};

export default useLessonsPage;
