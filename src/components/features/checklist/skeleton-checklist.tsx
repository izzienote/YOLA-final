'use client';

import { Skeleton } from '@/components/ui/skeleton';

const SkeletonChecklist = () => {
  return (
    <section className="w-full pt-[32px] md:pt-[59px]">
      <div className="flex w-full flex-col gap-[34px] pl-[37px] pr-[39px]">
        {/* 제목 스켈레톤 */}
        <Skeleton className="h-[24px] w-[200px]" />

        {/* 진행도 스켈레톤 */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-[20px] w-[100px]" />
          <Skeleton className="h-[8px] w-full rounded-full" />
        </div>
      </div>

      {/* 모바일 미션 카드 스켈레톤 */}
      <div className="mb-[36px] mt-[92px] block w-full md:hidden">
        <div className="flex gap-4 overflow-hidden px-4">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="flex h-[280px] w-[250px] shrink-0 flex-col items-start rounded-[20px] border border-secondary-grey-300 bg-white"
            >
              <Skeleton className="h-[24px] w-[200px] rounded-none rounded-t-[20px]" />
              <div className="flex flex-1 items-center justify-center p-4">
                <Skeleton className="h-[105px] w-[105px] rounded-full" />
              </div>
              <Skeleton className="h-[50px] w-full rounded-b-[20px]" />
            </div>
          ))}
        </div>
      </div>

      {/* 데스크톱 미션 카드 스켈레톤 */}
      <ul className="mt-[129px] hidden w-full max-w-[1200px] items-center gap-[24px] pl-[37px] pr-[39px] md:flex">
        {[...Array(4)].map((_, index) => (
          <li key={index}>
            <div className="flex h-[248px] w-[221px] flex-col items-start rounded-[20px] border border-secondary-grey-300 bg-white">
              <Skeleton className="h-[24px] w-[180px] rounded-none rounded-t-[20px]" />
              <div className="flex flex-1 items-center justify-center p-4">
                <Skeleton className="h-[93px] w-[93px] rounded-full" />
              </div>
              <Skeleton className="h-[45px] w-full rounded-b-[20px]" />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SkeletonChecklist;
