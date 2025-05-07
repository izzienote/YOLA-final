import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-keys';
import { uploadGonggamComment } from '@/lib/utils/api/gonggam/gonggam-detail-client.api';

export const useInsertGonggamComment = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (comment: string) => uploadGonggamComment({ postId, comment }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GONGGAM_COMMENTS, postId] });
    }
  });
};
