// lib/hooks/queries/useLifePostsByMonth.ts
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-keys';
import { getLifePostsByMonth } from '@/lib/utils/api/life/life-client.api';
import type { LifePostWithImageUrls } from '@/types/life-post';

export const useLifePostsByMonth = (month: string) => {
  return useQuery<LifePostWithImageUrls[]>({
    queryKey: [QUERY_KEY.LIFE_POSTS, month],
    queryFn: () => getLifePostsByMonth(month)
  });
};
