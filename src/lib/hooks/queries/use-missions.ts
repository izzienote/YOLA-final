import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-keys';
import { getMissionsData } from '@/lib/utils/api/missions.api';

// 모든 미션 리스트를 다 가져옵니다
export const useMissions = () => {
  return useQuery({
    queryKey: [QUERY_KEY.MISSIONS],
    queryFn: getMissionsData
  });
};
