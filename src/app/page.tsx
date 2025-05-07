import ChallengeSection from '@/components/features/onboarding/challenge-section';
import EndSection from '@/components/features/onboarding/end-section';
import FloatingButton from '@/components/features/onboarding/floating-button';
import GonggamBoardSection from '@/components/features/onboarding/gonggam-board-section';
import LifeSection from '@/components/features/onboarding/life-section';
import MissionSection from '@/components/features/onboarding/mission-section';
import RandomMissionSection from '@/components/features/onboarding/random-mission-section';
import TitleSection from '@/components/features/onboarding/title-section';

const OnboardingPage = () => {
  return (
    <div className="relative w-full">
      <TitleSection />
      <ChallengeSection />
      <MissionSection />
      <LifeSection />
      <RandomMissionSection />
      <GonggamBoardSection />
      <EndSection />
      <div className="sticky bottom-0 hidden md:block">
        <FloatingButton />
      </div>
    </div>
  );
};

export default OnboardingPage;
