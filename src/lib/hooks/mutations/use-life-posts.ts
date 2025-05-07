import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-keys';
import { TABLE } from '@/constants/supabase-tables-name';
import { parseTags } from '@/lib/utils/parse-tags';
import { supabase } from '@/lib/utils/supabase/supabase-client';

const LIFE_POSTS_TABLE = TABLE.LIFE_POSTS;
const USER_MISSION = TABLE.USER_MISSION;
const IMAGE_TABLE = 'life_post_image_path';

interface NewLifePostParams {
  title: string;
  content: string;
  rawTags: string; // 사용자 입력 문자열 (예: "#혼밥, #기록")
  missionId: string | null;
  imageUrls: string[];
  date: string; // 'YYYY-MM-DD' 형식
}

export const useLifePost = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ title, content, rawTags, missionId, imageUrls, date }: NewLifePostParams) => {
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
        .from(LIFE_POSTS_TABLE)
        .insert({
          user_id: user.id,
          title,
          content,
          tags, // Supabase의 text[] 컬럼으로 저장됨
          mission_id: missionId ? Number(missionId) : null,
          date
        })
        .select()
        .single();

      if (postError) throw new Error(postError.message);

      const postId = postData.id;

      // Step 2. 이미지 경로 등록
      if (imageUrls.length > 0) {
        const imageRows = imageUrls.map((url) => ({
          life_post_id: postId,
          image_url: url
        }));

        const { error: imageError } = await supabase.from(IMAGE_TABLE).insert(imageRows);
        if (imageError) {
          throw new Error(imageError.message);
        }
      }

      // Step 3. 미션 인증 등록
      if (missionId) {
        const { error: missionError } = await supabase.from(USER_MISSION).insert({
          user_id: user.id,
          completed_id: Number(missionId)
        });

        if (missionError) {
          throw new Error(missionError.message);
        }
      }

      return postData;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.LIFE_POSTS] });
    },

    onError: (error) => {
      console.error('LifePost 등록 실패:', error);
    }
  });

  return mutation;
};
