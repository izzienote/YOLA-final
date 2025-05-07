import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-keys';
import { getGonggamPostDetailByClient } from '@/lib/utils/api/gonggam/gonggam-detail-client.api';

export const useGetGonggamPostDetail = (postId: number) => {
  return useQuery({
    queryKey: [QUERY_KEY.GONGGAM_POSTS, postId],
    queryFn: () => getGonggamPostDetailByClient(postId)
  });
};
