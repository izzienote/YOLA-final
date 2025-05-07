import { TABLE } from '@/constants/supabase-tables-name';
import { fetchUserSessionState } from '@/lib/utils/api/auth/auth-client.api';
import { supabase } from '@/lib/utils/supabase/supabase-client';

export const getLifePostByMissionId = async (missionId: number) => {
  const { userId } = await fetchUserSessionState();
  const { data, error } = await supabase
    .from(TABLE.LIFE_POSTS)
    .select(
      `
        *,
        life_post_image_path (
          image_url
        )
      `
    )
    .eq('mission_id', missionId)
    .eq('user_id', userId!);

  if (error) throw new Error(error.message);
  if (!data) throw new Error('No data found');

  const processed = {
    ...data[0],
    image_urls: data[0].life_post_image_path?.map((img) => img.image_url) ?? []
  };

  return processed;
};
