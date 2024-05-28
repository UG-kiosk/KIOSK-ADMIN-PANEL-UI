import { useQuery } from '@tanstack/react-query';
import { getStaffMemberCall } from '../api/api';

const useStaffMemberPage = (id: string) => {
  const { data: staffMemberData } = useQuery({
    queryKey: ['staffMember', id],
    queryFn: async ({ queryKey }) => {
      return await getStaffMemberCall(queryKey[1]);
    },
  });

  return { staffMemberData };
};

export default useStaffMemberPage;
