import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-keys';
import { dislikePost, likePost } from '@/lib/utils/api/gonggam/gonggam-detail-client.api';

// 좋아요 등록
export const useLikePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId }: { postId: number }) => likePost({ postId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GONGGAM_LIKE] });
    }
  });
};

// 좋아요 취소
export const useDislikePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, userId }: { postId: number; userId: string }) => dislikePost({ postId, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GONGGAM_LIKE] });
    }
  });
};
