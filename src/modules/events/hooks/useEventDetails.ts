import { useQuery } from '@tanstack/react-query';
import { getEventDetailsCall } from '../api/api';

const useEventDetails = (id: string) => {
  const { data: eventDetailsData } = useQuery({
    queryKey: ['eventDetails', id],
    queryFn: async ({ queryKey }) => {
      return await getEventDetailsCall(queryKey[1]);
    },
  });

  return { eventDetailsData };
};

export default useEventDetails;
