import { v4 as uuidv4 } from 'uuid';
import { TABLE } from '@/constants/supabase-tables-name';
import { supabase } from '@/lib/utils/supabase/supabase-client';
import type { LifePostWithImageUrls } from '@/types/life-post';

const LIFE_POSTS_TABLE = TABLE.LIFE_POSTS;

export const getLifePostsByMonth = async (month: string): Promise<LifePostWithImageUrls[]> => {
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();
  if (!user) throw userError;

  const getNextMonthFirstDay = (month: string): string => {
    const [y, m] = month.split('-').map(Number);
    const next = new Date(y, m);
    const yyyy = next.getFullYear();
    const mm = String(next.getMonth() + 1).padStart(2, '0');
    return `${yyyy}-${mm}-01`;
  };

  const { data, error } = await supabase
    .from(LIFE_POSTS_TABLE)
    .select(
      `
      *,
      life_post_image_path (
        image_url
      )
    `
    )
    .eq('user_id', user.id)
    .gte('date', `${month}-01`)
    .lt('date', getNextMonthFirstDay(month))
    .order('created_at', { ascending: true });

  if (error) throw new Error(error.message);

  const processed = (data ?? []).map((post) => ({
    ...post,
    image_urls: post.life_post_image_path?.map((img) => img.image_url) ?? []
  }));

  return processed;
};

const IMAGE_STORAGE_BUCKET = 'life-post-images';

type UploadedImage = {
  publicUrl: string;
  storagePath: string;
};

export const uploadImages = async (files: File[]): Promise<UploadedImage[]> => {
  const uploaded: UploadedImage[] = [];

  for (const file of files) {
    const fileExt = file.name.split('.').pop();
    const randomid = uuidv4();
    const fileName = `${randomid}.${fileExt}`;
    const filePath = `diary/${fileName}`; // 실제 storage 경로

    const { error } = await supabase.storage.from(IMAGE_STORAGE_BUCKET).upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

    if (error) {
      throw new Error('이미지 업로드 실패: ' + error.message);
    }

    const {
      data: { publicUrl }
    } = supabase.storage.from(IMAGE_STORAGE_BUCKET).getPublicUrl(filePath);

    uploaded.push({ publicUrl, storagePath: filePath });
  }

  return uploaded;
};

export const deleteImages = async (paths: string[]) => {
  const { error } = await supabase.storage.from(IMAGE_STORAGE_BUCKET).remove(paths);
  if (error) throw new Error('이미지 삭제 실패: ' + error.message);
};
