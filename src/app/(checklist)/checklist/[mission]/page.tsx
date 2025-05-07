import { notFound } from 'next/navigation';
import ChecklistClient from '@/components/features/checklist/checklist-client';
import { validMissionTags } from '@/constants/mission';
import { getUserSessionState } from '@/lib/utils/api/auth/auth.api';
import type { EnumChecklist } from '@/types/supabase-const';

interface ChecklistProps {
  params: { mission: string };
}

export async function generateMetadata({ params }: ChecklistProps) {
  const decoded = decodeURIComponent(params.mission);

  if (!validMissionTags.includes(decoded as EnumChecklist)) {
    return {
      title: '잘못된 챌린지 접근',
      description: '유효하지 않은 체크리스트 페이지입니다.'
    };
  }

  return {
    title: `챌린지 - ${decoded} 체크리스트`,
    description: `${decoded} 체크리스트 페이지입니다.`
  };
}

const Checklist = async ({ params }: ChecklistProps) => {
  const decoded = decodeURIComponent(params.mission);

  if (!validMissionTags.includes(decoded as EnumChecklist)) {
    notFound();
  }

  const { userId } = await getUserSessionState();

  return <ChecklistClient mission={decoded} userId={userId} />;
};

export default Checklist;
