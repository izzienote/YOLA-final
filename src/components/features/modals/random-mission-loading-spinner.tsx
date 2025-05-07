import Image from 'next/image';
import { useEffect } from 'react';
import { FadeLoader } from 'react-spinners';
import MISSION_BACKGROUND from '@images/images/random-modal-bg.svg';

interface RandomMissionLoadingSpinnerProps {
  showContent: boolean;
  setShowContent: (arg: boolean) => void;
  randomMission: string;
}
const TIME_OUT = 1250;
const RandomMissionLoadingSpinner = ({
  showContent,
  setShowContent,
  randomMission
}: RandomMissionLoadingSpinnerProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, TIME_OUT);

    return () => clearTimeout(timer);
  }, [showContent, setShowContent]);

  if (!showContent) {
    return (
      <div className="flex h-[178px] w-full items-center justify-center">
        <div className="flex h-[178px] w-full items-center justify-center">
          <FadeLoader
            className="h-[94px] w-[94px]"
            cssOverride={{
              display: 'block',
              margin: '0 auto'
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <Image
        src={MISSION_BACKGROUND}
        alt="랜덤 미션 배경 효과"
        width={461}
        height={177}
        className="absolute"
        style={{ width: 'auto', height: 'auto' }}
      />
      <p className="justify-start text-center text-xl font-semibold leading-relaxed text-secondary-grey-900">
        {randomMission}
      </p>
    </>
  );
};

export default RandomMissionLoadingSpinner;
