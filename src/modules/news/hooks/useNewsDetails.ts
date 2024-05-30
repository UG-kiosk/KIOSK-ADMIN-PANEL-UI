import { useQuery } from '@tanstack/react-query';
import { getNewsDetailsCall } from '../api/api';

const useNewsDetailsPage = (id: string) => {
  const { data: newsDetailsData } = useQuery({
    queryKey: ['newsDetails', id],
    queryFn: async ({ queryKey }) => {
      return await getNewsDetailsCall(queryKey[1]);
    },
  });

  return { newsDetailsData };
};

export default useNewsDetailsPage;
