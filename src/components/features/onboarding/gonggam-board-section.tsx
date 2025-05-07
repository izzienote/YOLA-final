import Image from 'next/image';
import TextBlock from '@/components/features/onboarding/text-block';
import MOBILE_GONGGAM_BOARD_PREVIEW from '@images/images/onboarding-gonggam-mobile.svg';
import GONGGAM_BOARD_PREVIEW from '@images/images/onboarding-gonggam.svg';

const GonggamBoardSection = () => {
  return (
    <section className="flex w-full flex-col items-center gap-[31px] bg-white px-4 py-[60px] md:gap-10 md:py-[165px]">
      <TextBlock title="공감 게시판">나의 일상을 다른 사람들과 함게 공유해요</TextBlock>
      <Image
        src={GONGGAM_BOARD_PREVIEW}
        alt="공감 게시판 미리보기"
        width={608}
        height={186}
        draggable="false"
        className="hidden md:block"
      />
      <Image
        src={MOBILE_GONGGAM_BOARD_PREVIEW}
        alt="공감 게시판 미리보기"
        width={343}
        height={204}
        draggable="false"
        className="md:hidden"
      />
    </section>
  );
};

export default GonggamBoardSection;
