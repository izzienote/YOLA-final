'use client';

import { useEffect, useState } from 'react';
import ChecklistMissionSwiper from '@/components/features/checklist/checklist-mission-swiper';
import ChecklistProgress from '@/components/features/checklist/checklist-progress';
import MissionCardWrapper from '@/components/features/checklist/mission-card-wrapper';
import SkeletonChecklist from '@/components/features/checklist/skeleton-checklist';
import { PostDetailModal } from '@/components/features/modals/calendar-post-detail';
import { useGetChecklistData } from '@/lib/hooks/queries/use-get-checklist-data';
import { useGetLifePostByMissionId } from '@/lib/hooks/queries/use-get-life-post-by-mission-id';
import type { EnumLevel } from '@/types/supabase-const';

interface ChecklistClientProps {
  mission: string;
  userId: string | null;
}

const ChecklistClient = ({ mission, userId }: ChecklistClientProps) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMissionId, setSelectedMissionId] = useState<number | null>(null);

  const { data: checklistData, isLoading } = useGetChecklistData({
    mission,
    userId
  });

  const { data: selectedPost } = useGetLifePostByMissionId(selectedMissionId);

  useEffect(() => {
    if (selectedPost) {
      setShowModal(true);
    }
  }, [selectedPost]);

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMissionId(null);
  };

  if (isLoading) {
    return <SkeletonChecklist />;
  }

  if (!checklistData) {
    return null;
  }

  const userLevel = checklistData.userLevel as EnumLevel;
  const isMaster = userLevel === '5' && checklistData.progress === 5;

  return (
    <section className="flex w-full flex-col gap-[45px] pt-[32px] md:gap-[74px] md:pt-[59px]">
      <aside className="flex w-full flex-col gap-[22px] pl-[37px] pr-[39px]">
        <figure className="flex gap-[12px]">
          <h1 className="whitespace-nowrap text-[20px] font-semibold">{checklistData.decodedMission} 체크리스트</h1>
          {isMaster && (
            <span className="flex items-center gap-0.5 rounded-[18px] border border-mission-line px-2 py-1 text-[16px] font-semibold leading-[1.4] text-mission-clear">
              CLEAR
            </span>
          )}
        </figure>
        <ChecklistProgress progress={checklistData.progress} userLevel={userLevel} isMaster={isMaster} />
      </aside>

      {/* 모바일 스와이퍼 */}
      <article className="mb-[36px] block w-full md:hidden">
        <ChecklistMissionSwiper
          missionList={checklistData.missionList}
          onCompletedClick={setSelectedMissionId}
          {...(userId && { userId })}
        />
      </article>
      {/* 데스크탑 카드리스트 */}
      <ul className="hidden w-full max-w-[1200px] items-center gap-[24px] pl-[37px] pr-[39px] md:flex">
        {checklistData.missionList.map((mission) => (
          <li key={mission.id}>
            <MissionCardWrapper mission={mission} onCompletedClick={setSelectedMissionId} {...(userId && { userId })} />
          </li>
        ))}
      </ul>

      {/* 인증글 보기 모달 */}
      {selectedPost && showModal && (
        <PostDetailModal clickModal={handleCloseModal} showModal={showModal} post={selectedPost} />
      )}
    </section>
  );
};

export default ChecklistClient;
