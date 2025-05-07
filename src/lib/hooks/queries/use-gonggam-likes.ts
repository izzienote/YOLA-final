import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-keys';
import { getLikeCountClient, getUserLikedStatus } from '@/lib/utils/api/gonggam/gonggam-detail-client.api';

// 게시글의 좋아요 수를 조회
export const useLikeCount = (postId: number) => {
  return useQuery({
    queryKey: [QUERY_KEY.GONGGAM_LIKE, 'likeCount', postId],
    queryFn: () => getLikeCountClient(postId),
    enabled: !!postId
  });
};

// 현재 사용자가 해당 게시글에 좋아요했는지 여부
export const useLikedStatus = (postId: number, userId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.GONGGAM_LIKE, 'likedStatus', postId, userId],
    queryFn: () => {
      if (!userId) return Promise.resolve(false);
      return getUserLikedStatus({ postId, userId });
    },
    enabled: !!postId && !!userId
  });
};
