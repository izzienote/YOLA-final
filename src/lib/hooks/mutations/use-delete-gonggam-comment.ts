import { useMutation } from '@tanstack/react-query';
import { TABLE } from '@/constants/supabase-tables-name';
import { supabase } from '@/lib/utils/supabase/supabase-client';

export const useDeleteGonggamComment = () => {
  return useMutation({
    mutationFn: async (commentId: number) => {
      const { error } = await supabase.from(TABLE.COMMENTS).delete().eq('id', commentId);
      if (error) throw new Error(error.message);
    }
  });
};
