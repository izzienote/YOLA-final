import { TABLE } from '@/constants/supabase-tables-name';
import { createClient } from '@/lib/utils/supabase/supabase-server';

const LIFE_POSTS_TABLE = TABLE.LIFE_POSTS;
export const getLifePostById = async (id: number) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from(LIFE_POSTS_TABLE)
    .select(
      `*, life_post_image_path (
        image_url
      )`
    )
    .eq('id', id)
    .single();

  if (error) throw new Error(error.message);
  if (!data) throw new Error('No data found');

  const processed = {
    ...data,
    image_urls: data.life_post_image_path?.map((img) => img.image_url) ?? []
  };

  return processed;
};
