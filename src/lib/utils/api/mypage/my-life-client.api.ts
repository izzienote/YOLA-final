import { FAIL } from '@/constants/messages';
import { TABLE } from '@/constants/supabase-tables-name';
import { fetchUserSessionState } from '@/lib/utils/api/auth/auth-client.api';
import { supabase } from '@/lib/utils/supabase/supabase-client';
import type { GetLifePostsResponse } from '@/types/life-post';

/**
 * Supabase에서 `life_posts` 테이블의 전체 조회 및 `life_post_image_path`(image_url) 조회하는 함수
 *
 * @function getLifePostsAll - 무한스크롤 구현을 위한 페이지네이션 데이터 조회
 * @returns {Promise<GetLifePostsResponse>} - data, page, totalPages
 * @throws {Error} 데이터베이스 작업 중 오류가 발생하면 예외를 던집니다.
 * @postsPerPage - 한번에 가져올 데이터의 개수 (현재 8개 지정)
 * @from - .range(from,to) 의 from
 * @to - .range(from,to) 의 to
 */
export const getLifePostsAll = async ({
  page,
  sortBy
}: {
  page: number;
  sortBy: 'all' | 'mission' | 'diary';
}): Promise<GetLifePostsResponse> => {
  const { userId } = await fetchUserSessionState();
  if (!userId) throw new Error(FAIL.NEED_LOGIN);

  // 페이지당 게시물 수
  const postsPerPage = 8;
  const from = (page - 1) * postsPerPage;
  const to = from + postsPerPage - 1;

  // 필터 추가 (전체, 미션, 일기 보기)
  let query = supabase
    .from(TABLE.LIFE_POSTS)
    .select(`*, life_post_image_path(image_url)`, { count: 'exact' })
    .eq('user_id', userId);

  //mission_id의 null값의 유무에 따라 일기와 미션 구분
  if (sortBy === 'mission') {
    query = query
      .not('mission_id', 'is', null)
      .order('created_at', { ascending: false })
      .order('id', { ascending: false });
  } else if (sortBy === 'diary') {
    query = query.is('mission_id', null).order('created_at', { ascending: false }).order('id', { ascending: false });
  } else {
    query = query.order('created_at', { ascending: false }).order('id', { ascending: false });
  }

  const { data, count, error } = await query.range(from, to);

  if (error) throw new Error(error.message);

  const totalPages = count ? Math.ceil(count / postsPerPage) : 1;

  const processed = (data ?? []).map((post) => ({
    ...post,
    image_urls: post.life_post_image_path?.map((img) => img.image_url) ?? []
  }));

  return {
    data: processed,
    page,
    totalPages
  };
};
