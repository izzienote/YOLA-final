import Image from 'next/image';
import Link from 'next/link';
import { CustomButton } from '@/components/ui/custom-button';
import { PATH } from '@/constants/page-path';
import CAT from '@images/images/onboarding-cat.svg';
import SLIDE from '@images/images/onboarding-slide-icon.svg';
import MOBILE_TITLE from '@images/images/onboarding-title-mobile.svg';
import TITLE from '@images/images/onboarding-title.svg';

const TitleSection = () => {
  return (
    <section
      aria-label="타이틀 소개 섹션"
      className="relative flex h-[591px] w-full flex-col items-center bg-primary-orange-50 pt-[60px] md:h-[733px] md:pt-[240.5px]"
    >
      <Image
        src={TITLE}
        alt="온보딩 페이지 타이틀: 혼자서도 즐겁게!"
        width={388}
        height={48}
        draggable="false"
        className="hidden md:block"
      />
      <Image
        src={MOBILE_TITLE}
        alt="온보딩 페이지 타이틀: 혼자서도 즐겁게!"
        width={263}
        height={88}
        draggable="false"
        className="md:hidden"
      />
      <p className="mb-[80px] mt-[32px] hidden text-center md:block">
        YOLA는 혼자만의 하루를 의미 있고 즐겁게 만드는 라이프 기록 서비스예요.
        <br /> 일상을 가볍게 기록하고, 작은 도전으로 혼자 라이프를 즐겨보세요!
      </p>
      <p className="mb-[40px] mt-[20px] text-center leading-snug md:hidden">
        YOLA는 혼자만의 하루를 의미 있고 <br /> 즐겁게 만드는 라이프 기록 서비스예요.
        <br /> 일상을 가볍게 기록하고, 작은 도전으로 <br /> 혼자 라이프를 즐겨보세요!
      </p>
      <CustomButton asChild>
        <Link href={PATH.HOME} aria-label="메인 페이지로 이동하기 버튼">
          바로 시작하기
        </Link>
      </CustomButton>
      <Image
        src={CAT}
        alt="온보딩 페이지의 타이틀을 소개하는 고양이 캐릭터"
        width={331}
        height={306}
        className="absolute bottom-0 h-[168px] w-[182px] md:right-10 md:h-[306px] md:w-[331px]"
        draggable="false"
      />
      <Image
        src={SLIDE}
        alt="아래로 스크롤 하기 버튼 아이콘"
        width={66}
        height={48}
        className="mt-[158.5px] hidden md:block"
        draggable="false"
      />
    </section>
  );
};

export default TitleSection;
