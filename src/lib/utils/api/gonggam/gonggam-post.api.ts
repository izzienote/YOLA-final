import { TABLE } from '@/constants/supabase-tables-name';
import { createClient } from '@/lib/utils/supabase/supabase-server';

const GONGGAM_POSTS_TABLE = TABLE.GONGGAM_POSTS;
export const getGonggamPostById = async (id: number) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from(GONGGAM_POSTS_TABLE)
    .select(
      `*, gonggam_post_image_path (
        image_url
      )`
    )
    .eq('id', id)
    .single();

  if (error) throw new Error(error.message);
  if (!data) throw new Error('No data found');

  const processed = {
    ...data,
    image_urls: data.gonggam_post_image_path?.map((img) => img.image_url) ?? []
  };

  return processed;
};
