import { TABLE } from '@/constants/supabase-tables-name';
import { createClient } from '@/lib/utils/supabase/supabase-server';
import type { GonggamPostWithReaction } from '@/types/gonggam';

/**
 * public.gonggam_posts 테이블에서 조회수 높은순 3개의 공감 게시글을 불러옵니다.
 * @returns { Promise<GonggamPostWithReaction[]> } 공감 게시글 배열
 */
export const getGonggamPreviewList = async (): Promise<GonggamPostWithReaction[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from(TABLE.GONGGAM_POSTS)
    .select('*, likes(*), comments(*)')
    .order('view_count', { ascending: false })
    .limit(3);

  if (error) throw error;

  return data ?? [];
};

/**
 * 선택한 게시글의 조회수를 서버에서 받아오는 api 함수입니다.
 * @param { string } postId - 선택한 게시글의 id
 * @returns { number } - 선택한 게시글의 조회수
 */
export const getViewCount = async (postId: string): Promise<number> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from(TABLE.GONGGAM_POSTS)
    .select('view_count')
    .eq('id', Number(postId))
    .single();

  if (error) throw error;

  return data.view_count;
};
