'use client';

import { EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import MissionCardWrapper from '@/components/features/checklist/mission-card-wrapper';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import type { MissionWithStatus } from '@/types/checklist';

interface ChecklistMissionSwiperProps {
  missionList: MissionWithStatus[];
  userId?: string;
  onCompletedClick?: (missionId: number) => void;
}

const ChecklistMissionSwiper = ({ missionList, userId, onCompletedClick }: ChecklistMissionSwiperProps) => {
  return (
    <div className="overflow-visible">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        loop={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false
        }}
        pagination={{
          clickable: true,
          el: '.custom-pagination',
          bulletClass: 'custom-bullet',
          bulletActiveClass: 'custom-bullet-active'
        }}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {missionList.map((mission) => (
          <SwiperSlide key={mission.id} className="!w-[221px] shrink-0">
            <MissionCardWrapper mission={mission} userId={userId} onCompletedClick={onCompletedClick} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="custom-pagination mt-[29px] inline-flex items-center justify-center gap-2" />
    </div>
  );
};

export default ChecklistMissionSwiper;
