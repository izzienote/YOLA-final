// src/lib/server/queries/get-server-life-posts-by-month-range.ts

import { FAIL } from '@/constants/messages';
import { TABLE } from '@/constants/supabase-tables-name';
import { getUserSessionState } from '@/lib/utils/api/auth/auth.api';
import { createClient } from '@/lib/utils/supabase/supabase-server';
import type { LifePostWithImageUrls } from '@/types/life-post';

export const getServerLifePostsByMonth = async (month: string): Promise<LifePostWithImageUrls[]> => {
  const { userId, isLogin } = await getUserSessionState();
  if (!isLogin || !userId) throw new Error(FAIL.NEED_LOGIN);

  const supabase = await createClient();

  const start = `${month}-01`;
  const [y, m] = month.split('-').map(Number);
  const next = new Date(y, m);
  const end = `${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, '0')}-01`;

  const { data, error } = await supabase
    .from(TABLE.LIFE_POSTS)
    .select(`*, life_post_image_path(image_url)`)
    .eq('user_id', userId)
    .gte('date', start)
    .lt('date', end)
    .order('created_at', { ascending: true });

  if (error) throw new Error(error.message);

  return (data ?? []).map((post) => ({
    ...post,
    image_urls: post.life_post_image_path?.map((i) => i.image_url) ?? []
  }));
};
