import { useInfiniteQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-keys';
import { getMyGonggamPostsAll } from '@/lib/utils/api/mypage/my-gonggam-client.api';
import type { GetMyGonggamPostsResponse, SortBy } from '@/types/gonggam';

/**
 * @function useGetGonggamPostsInfiniteQuery
 * @returns - pageParams, pages 을 반환,
 */
const useGetGonggamPostsInfiniteQuery = (sortBy: SortBy) => {
  return useInfiniteQuery<GetMyGonggamPostsResponse>({
    queryKey: [QUERY_KEY.GONGGAM_POSTS_INFINITE, sortBy],
    queryFn: async ({ pageParam = 1 }) => getMyGonggamPostsAll({ page: pageParam as number, sortBy }),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1
  });
};

export default useGetGonggamPostsInfiniteQuery;
