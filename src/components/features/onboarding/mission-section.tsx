import Image from 'next/image';
import TextBlock from '@/components/features/onboarding/text-block';
import MOBILE_LEVEL_PREVIEW from '@images/images/onboarding-level-mobile.svg';
import LEVEL_PREVIEW from '@images/images/onboarding-level.svg';
import MOBILE_MISSION_PREVIEW from '@images/images/onboarding-mission-mobile.svg';
import MISSION_PREVIEW from '@images/images/onboarding-mission.svg';

const MissionSection = () => {
  return (
    <section className="flex w-full flex-col items-center bg-secondary-grey-100 px-4 py-[60px] md:py-[90px]">
      <TextBlock title="챌린지 인증하기" className="hidden md:flex">
        미션을 인증했다면, 인증글을 작성해 레벨을 높일 수 있어요. <br />
        챌린지 탭에서 바로 인증글을 작성해 보세요!
      </TextBlock>
      <TextBlock title="챌린지 인증하기" className="md:hidden">
        미션을 인증했다면, 인증글을 작성해 <br />
        레벨을 높일 수 있어요.
        <br /> 챌린지 탭에서 바로 인증글을 작성해 보세요!
      </TextBlock>
      <Image
        src={MISSION_PREVIEW}
        alt="챌린지 미션 인증 작성 미리보기"
        width={548}
        height={288}
        className="mb-20 mt-10 hidden md:block"
        draggable="false"
      />
      <Image
        src={MOBILE_MISSION_PREVIEW}
        alt="챌린지 미션 인증 작성 미리보기"
        width={343}
        height={340}
        className="mb-10 mt-7 md:hidden"
        draggable="false"
      />

      <TextBlock title="레벨 시스템">
        챌린지별로 레벨을 확인할 수 있어요. <br />
        다양한 미션을 수행하며 레벨을 높여봐요!
      </TextBlock>
      <Image
        src={LEVEL_PREVIEW}
        alt="레벨 시스템 미리보기"
        width={548}
        height={288}
        className="mt-10 hidden md:block"
        draggable="false"
      />
      <Image
        src={MOBILE_LEVEL_PREVIEW}
        alt="레벨 시스템 미리보기"
        width={548}
        height={288}
        className="mt-7 md:hidden"
        draggable="false"
      />
    </section>
  );
};

export default MissionSection;
