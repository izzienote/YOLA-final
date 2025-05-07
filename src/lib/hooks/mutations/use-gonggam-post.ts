import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-keys';
import { TABLE } from '@/constants/supabase-tables-name';
import { supabase } from '@/lib/utils/supabase/supabase-client';
import type { EnumCategories } from '@/types/supabase-const';

export const GONGGAM_POSTS_TABLE = TABLE.GONGGAM_POSTS;
export const IMAGE_TABLE = 'gonggam_post_image_path';

// 해시태그 문자열 → 배열 변환 함수
const parseTags = (raw: string): string[] => {
  return raw
    .split(/[\s,]+/) // 공백 또는 쉼표로 분리
    .map((tag) => tag.trim().replace(/^#/, '')) // 앞의 # 제거
    .filter((tag) => tag.length > 0);
};

interface NewGonggamPostParams {
  category: EnumCategories;
  content: string;
  created_at?: string;
  id?: number;
  title: string;
  updated_at?: string | null;
  user_id?: string;
  imageUrls: string[];
  rawTags: string; // 사용자 입력 문자열 (예: "#혼밥, #기록")
}

export const useGonggamPost = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      title,
      content,
      category,
      imageUrls,
      created_at,
      updated_at,
      rawTags
    }: NewGonggamPostParams) => {
      // 로그인된 유저 확인
      const {
        data: { user },
        error: userError
      } = await supabase.auth.getUser();

      if (!user || userError) {
        throw new Error('로그인된 사용자가 없습니다.');
      }

      const tags = parseTags(rawTags); // 해시태그 파싱

      // Step 1. 게시글 등록
      const { data: postData, error: postError } = await supabase
        .from(GONGGAM_POSTS_TABLE)
        .insert({
          title,
          content,
          category,
          created_at,
          updated_at,
          tags, // Supabase의 text[] 컬럼으로 저장됨
          user_id: user.id
        })
        .select()
        .single();

      if (postError) throw new Error(postError.message);

      const postId = postData.id;

      // Step 2. 이미지 경로 등록
      if (imageUrls.length > 0) {
        const imageRows = imageUrls.map((url) => ({
          post_id: postId,
          image_url: url
        }));

        const { error: imageError } = await supabase.from(IMAGE_TABLE).insert(imageRows);
        if (imageError) {
          throw new Error(imageError.message);
        }
      }

      return postData;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GONGGAM_POSTS] });
    },

    onError: (error) => {
      console.error('GonggamPost 등록 실패:', error);
    }
  });

  return mutation;
};
