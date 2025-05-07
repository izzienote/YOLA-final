import { FAIL } from '@/constants/messages';
import { TABLE } from '@/constants/supabase-tables-name';
import { fetchUserSessionState } from '@/lib/utils/api/auth/auth-client.api';
import { supabase } from '@/lib/utils/supabase/supabase-client';
import type { GetMyGonggamPostsResponse, GonggamPostWithCounts, SortBy } from '@/types/gonggam';

/**
 * Supabase에서 `gonggam_posts_with_counts` 뷰 전체 조회하는 함수
 *
 * @function getMyGonggamPostsAll - 무한스크롤 구현을 위한 페이지네이션 데이터 조회
 * @returns {Promise<GetMyGonggamPostsResponse>} - data, page, totalPages
 * @throws {Error} 데이터베이스 작업 중 오류가 발생하면 예외를 던집니다.
 */
export const getMyGonggamPostsAll = async ({
  page,
  sortBy
}: {
  page: number;
  sortBy: SortBy;
}): Promise<GetMyGonggamPostsResponse> => {
  const { userId } = await fetchUserSessionState();
  if (!userId) throw new Error(FAIL.NEED_LOGIN);

  const postsPerPage = 4;
  const from = (page - 1) * postsPerPage;
  const to = from + postsPerPage - 1;

  let query = supabase
    .from(TABLE.GONGGAM_POSTS_WITH_COUNTS)
    .select('*,users(nickname)', { count: 'exact' })
    .eq('user_id', userId);

  if (sortBy === 'comments') {
    query = query.order('comment_count', { ascending: false });
  } else if (sortBy === 'likes') {
    query = query.order('like_count', { ascending: false });
  } else {
    query = query.order('created_at', { ascending: false }).order('id', { ascending: false });
  }

  const { data, count, error } = await query.range(from, to);

  if (error) throw new Error(error.message);

  const totalPages = count ? Math.ceil(count / postsPerPage) : 1;

  return {
    data: data as GonggamPostWithCounts[],
    page,
    totalPages
  };
};
