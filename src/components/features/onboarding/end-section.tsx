import Link from 'next/link';
import { CustomButton } from '@/components/ui/custom-button';
import { PATH } from '@/constants/page-path';

const EndSection = () => {
  return (
    <section className="flex w-full flex-col items-center gap-10 bg-gradient-to-b from-white to-[#FFF8E3] py-[60px] md:gap-[50px] md:py-[245px]">
      <div className="flex flex-col items-center justify-start gap-1 self-stretch text-center md:gap-2">
        <strong className="h-[29px] text-xl font-semibold leading-7 text-primary-orange-600 md:h-[42px] md:text-3xl md:leading-10">
          이젠, YOLA와 함께
        </strong>
        <p className="text-base leading-snug md:h-[25px] md:text-lg md:leading-relaxed">
          혼자서도 즐거운 일상을 시작해 보세요!
        </p>
      </div>
      <CustomButton asChild>
        <Link href={PATH.HOME} aria-label="메인 페이지로 이동하기 버튼">
          바로 시작하기
        </Link>
      </CustomButton>
    </section>
  );
};

export default EndSection;
