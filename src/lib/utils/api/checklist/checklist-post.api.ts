import { FAIL } from '@/constants/messages';
import { TABLE } from '@/constants/supabase-tables-name';
import { getCompletedMissionIds, getMissionListByLevel } from '@/lib/utils/api/checklist/checklist.api';
import { createClient } from '@/lib/utils/supabase/supabase-server';
import type { EnumChecklist, TableMissionList } from '@/types/supabase-const';

interface DropdownParams {
  userId: string;
  missionId: number;
}

export async function getMissionDropdownData({ userId, missionId }: DropdownParams): Promise<{
  missions: TableMissionList[];
  completedIds: number[];
}> {
  const supabase = await createClient();

  // 1. missionId로 type, level 조회
  const { data: meta, error: metaError } = await supabase
    .from(TABLE.MISSION_LIST)
    .select('type, level')
    .eq('id', missionId)
    .single();

  if (metaError) throw new Error(metaError.message);
  if (!meta) throw new Error(FAIL.NOTFOUND_MISSION_INFO);

  const { type, level } = meta;

  // 2. 해당 type + level의 미션 리스트
  const missions = await getMissionListByLevel(type as EnumChecklist, level);

  // 3. 유저가 완료한 미션 ID
  const completedIds = await getCompletedMissionIds({
    userId,
    missionIds: missions.map((m) => m.id)
  });

  return {
    missions,
    completedIds
  };
}
