import MissionButton from '@/components/features/home/main-random-mission-button';
import RandomMissionContainer from '@/components/features/home/main-random-mission-container';
import ImageSection from '@/components/features/home/main-random-mission-image';
import TitleSection from '@/components/features/home/main-random-title';
import { getUserSessionState } from '@/lib/utils/api/auth/auth.api';
import { getMissionsData } from '@/lib/utils/api/missions.api';

const RandomMissionSection = async () => {
  const { isLogin } = await getUserSessionState();
  const missionData = await getMissionsData();

  return (
    <RandomMissionContainer>
      <div className="flex w-[183px] flex-col gap-[37px] md:w-[230px] md:gap-[71px]">
        <TitleSection />
        <MissionButton isLogin={isLogin} missionData={missionData} />
      </div>
      <ImageSection />
    </RandomMissionContainer>
  );
};

export default RandomMissionSection;
