import { TABLE } from '@/constants/supabase-tables-name';
import { supabase } from '@/lib/utils/supabase/supabase-client';
import type { GonggamPostDetailResponse, PaginatedPostsResponse } from '@/types/gonggam';
import type { EnumCategories } from '@/types/supabase-const';

const PAGE_SIZE = 5; // 페이지당 보여줄 게시글 수

/** getGonggamPostsCountByCategory
 * 카테고리별 총 게시글 수 조회
 */
const getGonggamPostsCountByCategory = async (category: EnumCategories): Promise<number> => {
  const { count, error } = await supabase
    .from(TABLE.GONGGAM_POSTS_WITH_COUNTS)
    .select('*', { count: 'exact', head: true })
    .eq('category', category);

  if (error && !count) throw new Error(error.message);

  return count ?? 0;
};

/** getGonggamPostsByCategoryAndPage
 * 카테고리 + 페이지 범위로 게시글 조회 (작성자 닉네임 + 이미지 포함)
 */
const getGonggamPostsByCategoryAndPage = async (category: EnumCategories, page: number) => {
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data, error } = await supabase
    .from(TABLE.GONGGAM_POSTS_WITH_COUNTS)
    .select(
      `
      *,
      writer:users (
        nickname
      ),
      images:gonggam_post_image_path (
        image_url
      )
    `
    )
    .eq('category', category)
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) throw new Error(error.message);

  return (data ?? []).map((post) => ({
    ...post,
    writer: {
      nickname: post.writer?.nickname ?? ''
    },
    imageUrl: post.images?.[0]?.image_url ?? ''
  }));
};

/** getPaginatedGonggamPostsByClient
 * 공감 게시글을 카테고리별 + 페이지네이션 기반으로 조회하는 클라이언트 전용 통합 함수
 */
export const getPaginatedGonggamPostsByClient = async (
  category: EnumCategories,
  page: number = 1
): Promise<PaginatedPostsResponse> => {
  const [totalCount, posts] = await Promise.all([
    getGonggamPostsCountByCategory(category),
    getGonggamPostsByCategoryAndPage(category, page)
  ]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return {
    posts: posts as GonggamPostDetailResponse[],
    pagination: {
      currentPage: page,
      totalPages,
      totalCount
    }
  };
};
