import { getUserSessionState } from '@/lib/utils/api/auth/auth.api';
import { getUserLevelByMission } from '@/lib/utils/api/checklist/checklist.api';

const LevelLabel = async ({ checkListType }: { checkListType: string }) => {
  const { userId } = await getUserSessionState();

  if (userId === null) return; // 비로그인 상태일 때는 레벨 정보 표시 안 함

  const userLevel = await getUserLevelByMission({ userId, decodedMission: checkListType });

  return (
    <p className="absolute bottom-4 right-4 flex h-[21px] items-center rounded-[20px] bg-primary-orange-100 px-2.5 py-0.5 text-xs">
      LV.{userLevel}
    </p>
  );
};

export default LevelLabel;
