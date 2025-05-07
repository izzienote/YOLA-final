import { useMutation } from '@tanstack/react-query';
import { TABLE } from '@/constants/supabase-tables-name';
import { supabase } from '@/lib/utils/supabase/supabase-client';
import type { TableComments } from '@/types/supabase-const';

interface UpdateCommentParams {
  commentId: number;
  content: string;
}

export const useUpdateGonggamComment = () => {
  return useMutation({
    mutationFn: async ({ commentId, content }: UpdateCommentParams): Promise<TableComments> => {
      const { data, error } = await supabase
        .from(TABLE.COMMENTS)
        .update({ comment: content })
        .eq('id', commentId)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return data;
    }
  });
};
