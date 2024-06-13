import { useQuery } from '@tanstack/react-query';
import { getLessonsDetailsCall } from '../Api/api';

const useLessonsDetailsPage = (id: string) => {
  const { data: lessonsDetailsData } = useQuery({
    queryKey: ['lessonsDetails', id],
    queryFn: async ({ queryKey }) => {
      return await getLessonsDetailsCall(queryKey[1]);
    },
  });

  return { lessonsDetailsData };
};

export default useLessonsDetailsPage;
