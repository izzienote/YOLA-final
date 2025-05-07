import PostInputForm from '@/components/common/post-input-form';
import { getUserSessionState } from '@/lib/utils/api/auth/auth.api';
import { getMissionDropdownData } from '@/lib/utils/api/checklist/checklist-post.api';
import type { TableMissionList } from '@/types/supabase-const';

const LifePostPage = async ({ searchParams }: { searchParams: { mission_id?: string } }) => {
  const missionId = searchParams?.mission_id ?? null;
  const { userId } = await getUserSessionState();

  let missions: TableMissionList[] = [];
  let completedIds: number[] = [];
  if (missionId && userId) {
    const result = await getMissionDropdownData({
      userId,
      missionId: +missionId
    });

    missions = result.missions;
    completedIds = result.completedIds;
  }

  return <PostInputForm missionId={missionId} dropdownMissions={missions} completedIds={completedIds} />;
};

export default LifePostPage;
