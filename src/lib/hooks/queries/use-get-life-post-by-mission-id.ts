import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-keys';
import { getLifePostByMissionId } from '@/lib/utils/api/life/life-by-mission.api';
import type { LifePostWithImageUrls } from '@/types/life-post';

export const useGetLifePostByMissionId = (missionId: number | null) => {
  return useQuery<LifePostWithImageUrls>({
    queryKey: [QUERY_KEY.LIFE_POSTS, missionId],
    queryFn: () => getLifePostByMissionId(missionId!),
    enabled: missionId !== null
  });
};
