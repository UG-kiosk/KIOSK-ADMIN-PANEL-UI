import { useQuery } from '@tanstack/react-query';
import { getStaffCall } from '../api/api';
import { useSearchParamsContext } from '../../../providers/searchParamsProvider';

const useStaffPage = () => {
  const { handleGetSearchParam } = useSearchParamsContext();

  const pageParam = Number(handleGetSearchParam('page')) ?? 1;
  const nameParam = handleGetSearchParam('name') ?? '';

  const { data: staffListData } = useQuery({
    queryKey: ['staffList', pageParam, nameParam],
    queryFn: async () => {
      const page = pageParam === 0 ? 1 : pageParam;
      return await getStaffCall('PL', page.toString(), nameParam);
    },
    select: data => ({
      staff: data.response,
      pagination: data.pagination,
    }),
  });

  return {
    staff: staffListData?.staff,
    pagination: staffListData?.pagination,
  };
};

export default useStaffPage;
