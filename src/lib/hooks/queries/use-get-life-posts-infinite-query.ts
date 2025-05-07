import { useInfiniteQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-keys';
import { getLifePostsAll } from '@/lib/utils/api/mypage/my-life-client.api';
import type { GetLifePostsResponse, SortBy } from '@/types/life-post';

/**
 * @function useGetLifePostsInfiniteQuery
 * @returns - pageParams, pages 을 반환,
 */
const useGetLifePostsInfiniteQuery = (sortBy: SortBy) => {
  return useInfiniteQuery<GetLifePostsResponse>({
    queryKey: [QUERY_KEY.LIFE_POSTS_INFINITE, sortBy],
    queryFn: ({ pageParam = 1 }) => getLifePostsAll({ page: pageParam as number, sortBy }),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1
  });
};

export default useGetLifePostsInfiniteQuery;
