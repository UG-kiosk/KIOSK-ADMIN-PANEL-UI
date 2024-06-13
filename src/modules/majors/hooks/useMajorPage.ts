import { useQuery } from '@tanstack/react-query';
import { getMajorCall } from '../api/api';

export const useMajorPage = (id: string) => {
  const { data: majorData } = useQuery({
    queryKey: ['major', id],
    queryFn: async ({ queryKey }) => {
      return await getMajorCall(queryKey[1]);
    },
  });

  return { majorData };
};
