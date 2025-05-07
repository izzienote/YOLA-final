'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import MissionCard from '@/components/features/checklist/mission-card';
import { FAIL } from '@/constants/messages';
import { PATH } from '@/constants/page-path';
import { toastAlert } from '@/lib/utils/toast';
import type { MissionWithStatus } from '@/types/checklist';

interface MissionCardWrapperProps {
  mission: MissionWithStatus;
  userId?: string;
  onCompletedClick?: (missionId: number) => void;
}

const MissionCardWrapper = ({ mission, userId, onCompletedClick }: MissionCardWrapperProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const isCompleted = mission.completed;

  // URL에서 카테고리 정보 추출 및 디코딩
  const category = decodeURIComponent(pathname.split('/')[2]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!userId) {
      e.preventDefault();
      toastAlert(FAIL.NEED_LOGIN, 'destructive');
      router.push(PATH.LOGIN);
    } else if (isCompleted && onCompletedClick) {
      e.preventDefault();
      onCompletedClick(mission.id);
    }
  };

  const href =
    !isCompleted && userId
      ? `${PATH.LIFE_POST}?mission_id=${mission.id}&category=${encodeURIComponent(category)}`
      : '#';

  return (
    <Link
      href={href}
      onClick={handleClick}
      className="flex h-[280px] w-[250px] flex-col items-start rounded-[20px] border border-secondary-grey-300 bg-white md:h-[248px] md:w-[221px]"
    >
      <MissionCard mission={mission} isCompleted={isCompleted} />
    </Link>
  );
};

export default MissionCardWrapper;
