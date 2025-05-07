import Image from 'next/image';
import TextBlock from '@/components/features/onboarding/text-block';
import CHECKLIST_CARD from '@images/images/onboarding-checklist-card.svg';

const ChallengeSection = () => {
  return (
    <section className="flex w-full flex-col items-center bg-white px-4 py-[60px] md:py-[90px]">
      <TextBlock title="YOLA 챌린지" className="hidden md:flex">
        혼자만의 여유 시간에 즐길 수 있는 다양한 챌린지들이 준비되어 있어요
      </TextBlock>
      <TextBlock title="YOLA 챌린지" className="md:hidden">
        혼자만의 여유 시간에 즐길 수 있는
        <br /> 다양한 챌린지들이 준비되어 있어요
      </TextBlock>
      <Image
        src={CHECKLIST_CARD}
        alt="체크리스트 카드 미리보기"
        width={715}
        height={454}
        className="mt-[45px]"
        draggable="false"
      />
    </section>
  );
};

export default ChallengeSection;
