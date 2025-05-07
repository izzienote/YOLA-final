import { useMutation } from '@tanstack/react-query';
import { GONGGAM_POSTS_TABLE, IMAGE_TABLE } from '@/lib/hooks/mutations/use-gonggam-post';
import { parseTags } from '@/lib/utils/parse-tags';
import { supabase } from '@/lib/utils/supabase/supabase-client';
import { newSeoulISOString } from '@/lib/utils/utc-to-kst';
import { EnumCategories } from '@/types/supabase-const';

interface UpdateGonggamPostParams {
  category: EnumCategories;
  content: string;
  created_at?: string;
  id: number;
  title: string;
  user_id?: string;
  imageUrls: string[];
  rawTags: string; // 사용자 입력 문자열 (예: "#혼밥, #기록")
}

export const useUpdateGonggamPost = () => {
  return useMutation({
    mutationFn: async ({ id, title, content, category, imageUrls, rawTags }: UpdateGonggamPostParams) => {
      const updatedAt = newSeoulISOString();

      // Step 1. 게시글 업데이트
      const { error: postError } = await supabase
        .from(GONGGAM_POSTS_TABLE)
        .update({
          title,
          content,
          category,
          updated_at: updatedAt,
          tags: parseTags(rawTags)
        })
        .eq('id', id);

      if (postError) throw new Error(postError.message);

      // 2. 기존 이미지 경로 삭제
      const { error: deleteError } = await supabase.from(IMAGE_TABLE).delete().eq('post_id', id);

      if (deleteError) {
        throw new Error('기존 이미지 삭제 실패: ' + deleteError.message);
      }

      // Step 3. 새로운 이미지 경로 삽입
      if (imageUrls.length > 0) {
        const insertData = imageUrls.map((url) => ({
          post_id: id,
          image_url: url
        }));

        const { error: imageError } = await supabase.from(IMAGE_TABLE).insert(insertData);
        if (imageError) {
          throw new Error('새 이미지 등록 실패: ' + imageError.message);
        }
      }

      return { success: true };
    }
  });
};
