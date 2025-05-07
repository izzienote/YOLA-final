import Image from 'next/image';
import ButtonClientComponent from '@/components/features/mypage/button-client-component';
import type { TableMissionList } from '@/types/supabase-const';
import CAT_IN_QUESTION_BOX from '@images/images/cat-in-question-box.svg';

interface RandomMissionBoxProps {
  missionsData: TableMissionList[];
  isLogin: boolean;
}

const RandomMissionBox = ({ missionsData, isLogin }: RandomMissionBoxProps) => {
  return (
    <>
      {/* 데스크탑 전용 랜덤박스 고양이 (md 이상) */}
      <section className="hidden md:block">
        {/* 배경색 */}
        <div className="relative mb-[96px] flex min-h-[178px] w-full flex-row justify-between rounded-[12px] border-none bg-mypage-peach pl-[28px] pr-[96px] pt-[27px] text-sm leading-tight text-secondary-grey-900">
          {/* 왼쪽 텍스트 & 버튼 */}
          <article className="flex max-w-[70%] flex-col justify-start">
            <p className="mt-[27px] text-base font-normal leading-snug text-secondary-grey-900">
              혼자서 보내는 시간이 지루하게 느껴질 때,
            </p>
            <p className="mb-[15px] text-base font-normal leading-snug text-secondary-grey-900">
              다양한 주제의 <span className="font-semibold">랜덤 미션</span>을 통해 매일 색다른 하루를 만들어보세요.
            </p>
            <ButtonClientComponent missionsData={missionsData} isLogin={isLogin} />
          </article>

          {/* 오른쪽 고양이 이미지 */}
          <aside className="flex shrink-0 items-end">
            <figure className="relative h-[164px] w-[139px]">
              <Image
                src={CAT_IN_QUESTION_BOX}
                alt="?가 그려진 박스 안에 들어가 있는 고양이 일러스트"
                fill
                className="object-contain"
              />
            </figure>
          </aside>
        </div>
      </section>

      {/* 모바일 전용 랜덤박스 고양이 (md 이하) */}
      <section className="block md:hidden">
        {/* 배경색 */}
        <div className="mb-[30px] flex min-h-[104px] w-full flex-row justify-between rounded-[12px] border-none bg-mypage-peach pl-[19px] pr-[24px] pt-[16px] text-sm leading-tight text-secondary-grey-900">
          {/* 왼쪽 텍스트 & 버튼 */}
          <article className="flex flex-col justify-start">
            <p className="text-sm font-normal leading-snug">
              <span className="font-semibold">랜덤 미션</span>으로
            </p>
            <p className="mb-[11px] text-sm font-normal leading-snug">혼자만의 하루를 더 재미있게!</p>
            <ButtonClientComponent missionsData={missionsData} isLogin={isLogin} />
          </article>
          {/* 오른쪽 고양이 이미지 */}
          <aside className="relative">
            <figure className="absolute bottom-0 right-0 h-[95px] w-[94px]">
              <Image
                src={CAT_IN_QUESTION_BOX}
                alt="?가 그려진 박스 안에 들어가 있는 고양이 일러스트"
                fill
                className="object-contain"
              />
            </figure>
          </aside>
        </div>
      </section>
    </>
  );
};

export default RandomMissionBox;
