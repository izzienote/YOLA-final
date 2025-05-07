import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-keys';
import { updateUserProfile } from '@/lib/utils/api/auth/auth-action';

export const useUpdateProfileMutate = () => {
  const queryClient = useQueryClient();

  const { mutate: updateProfileMutate } = useMutation({
    mutationFn: updateUserProfile, // 서버 액션
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.PROFILE]
      });
    },
    onError: (error) => {
      throw error;
    }
  });

  return updateProfileMutate;
};
