import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-keys';
import { getChecklistData } from '@/lib/utils/api/checklist/checklist-client.api';
import type { MissionWithStatus } from '@/types/checklist';
import type { EnumChecklist } from '@/types/supabase-const';

interface UseGetChecklistDataProps {
  mission: string;
  userId: string | null;
}

interface ChecklistData {
  decodedMission: EnumChecklist;
  userId: string | null;
  userLevel: string;
  progress: number;
  missionList: MissionWithStatus[];
}

export const useGetChecklistData = ({ mission, userId }: UseGetChecklistDataProps) => {
  return useQuery<ChecklistData>({
    queryKey: [QUERY_KEY.CHECKLIST_DETAIL, mission, userId],
    queryFn: () => getChecklistData({ mission, userId }),
    enabled: !!mission,
    gcTime: 0,
    staleTime: 0,
    refetchOnWindowFocus: true,
    retry: 1
  });
};
