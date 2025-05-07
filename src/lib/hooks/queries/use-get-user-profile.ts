import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-keys';
import { fetchUserProfile } from '@/lib/utils/api/auth/auth-client.api';
import type { TableUsers } from '@/types/supabase-const';

export const useUserProfile = (initProfile: TableUsers) => {
  const {
    data: profile,
    isPending: isProfilePending,
    isError: isProfileError,
    error: profileFetchingError
  } = useQuery({
    queryFn: fetchUserProfile,
    queryKey: [QUERY_KEY.PROFILE],
    initialData: initProfile
  });

  return { profile, isProfilePending, isProfileError, profileFetchingError };
};
