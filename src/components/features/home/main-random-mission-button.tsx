'use client';

import { useState } from 'react';
import RandomMissionModal from '@/components/features/modals/random-mission';
import { CustomButton } from '@/components/ui/custom-button';
import type { TableMissionList } from '@/types/supabase-const';

interface ButtonProps {
  isLogin: boolean;
  missionData: TableMissionList[];
}

const MissionButton = ({ isLogin, missionData }: ButtonProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const clickModal = () => setShowModal(!showModal);
  return (
    <>
      <CustomButton
        variant="outline"
        onClick={clickModal}
        className="absolute top-[154px] h-[42px] w-full lg:static lg:w-[230px]"
      >
        미션뽑기
      </CustomButton>
      {showModal && (
        <RandomMissionModal
          showModal={showModal}
          clickModal={clickModal}
          missionsData={missionData}
          isLogin={isLogin}
        />
      )}
    </>
  );
};

export default MissionButton;
