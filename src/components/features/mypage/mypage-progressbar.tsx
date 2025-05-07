'use client';

import { clsx } from 'clsx';
import { useEffect, useState } from 'react';
import { USER_LEVELS } from '@/lib/utils/calculate-user-level';

interface MypageProgressBarProps {
  level: string;
  remainingMissions: number | null;
}

const MypageProgressBar = ({ level, remainingMissions }: MypageProgressBarProps) => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const totalSteps = 5;
  const progressWidth = `${(currentStep / totalSteps) * 100}%`;
  const stepLabels = Object.values(USER_LEVELS) as string[];

  useEffect(() => {
    const index = stepLabels.indexOf(level);
    setCurrentStep(index === -1 ? 0 : index);
  }, [level, stepLabels]);

  return (
    <section className="item-center flex flex-col gap-3 rounded-[12px] border border-secondary-grey-400 px-10 pt-10">
      {/* 전체 레벨 바 표시 */}
      <div>
        <div className="relative flex items-center justify-between">
          {/* Progress Bar */}
          <div className="relative h-[10px] w-full rounded-full bg-secondary-grey-200">
            {/* 채워지는 부분 */}
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-primary-orange-400 transition-all duration-300"
              style={{ width: progressWidth }}
            />

            {/* 카테고리 사이 세로 구분선 */}
            {[...Array(totalSteps + 1)].map((_, idx) => (
              <div
                key={idx}
                className="absolute top-[-6px] h-6 w-px bg-white"
                style={{ left: `${(idx / totalSteps) * 100}%` }}
              />
            ))}

            {/* 현재 단계 circle 표시 */}
            <div
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `calc(${(currentStep / totalSteps) * 100}% )` }}
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full border-[5px] border-primary-orange-400 bg-white" />
            </div>
          </div>
        </div>

        {/* 5단계 라벨 - 동그라미와 수직 정렬 */}
        <div className="relative mt-3 h-5">
          {/* 테스크탑 환경 - 5단계 전체 표시 */}
          <div className="hidden md:block">
            {[...Array(totalSteps + 1)].map((_, idx) => (
              <div
                key={idx}
                className="absolute left-0 top-0 -translate-x-1/2 whitespace-nowrap"
                style={{ left: `${(idx / totalSteps) * 100}%` }}
              >
                <span className={clsx('text-sm text-secondary-grey-900', stepLabels[idx] === level && 'font-semibold')}>
                  {stepLabels[idx]}
                </span>
              </div>
            ))}
          </div>

          {/* 모바일 환경 - 5단계 중 START, MASTER, 현재 레벨만 표시 */}
          <div className="block md:hidden">
            {[...Array(totalSteps + 1)].map((_, idx) => {
              const label = stepLabels[idx];
              const isVisible = label === USER_LEVELS.START || label === USER_LEVELS.MASTER || label === level;

              if (!isVisible) return null;
              return (
                <div
                  key={idx}
                  className="absolute left-0 top-0 -translate-x-1/2 whitespace-nowrap"
                  style={{ left: `${(idx / totalSteps) * 100}%` }}
                >
                  <span
                    className={clsx('text-sm text-secondary-grey-900', stepLabels[idx] === level && 'font-semibold')}
                  >
                    {stepLabels[idx]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 아래 레벨 현황 및 남은 개수 */}
      <footer className="-mx-10 mt-[40px] w-[calc(100%+80px)] rounded-b-[12px] border-t border-dashed border-secondary-grey-600 bg-secondary-grey-100 p-[16px] text-center text-xs md:text-base">
        {remainingMissions !== null ? (
          <span>
            당신의 레벨은 <span className="font-semibold">{level}</span>입니다. 다음 레벨까지{' '}
            <span className="font-semibold">{remainingMissions}</span>개 남았습니다.
          </span>
        ) : (
          <span>
            당신의 레벨은 <span className="font-semibold">{level}</span>입니다. 최고 레벨입니다 🎉
          </span>
        )}
      </footer>
    </section>
  );
};

export default MypageProgressBar;
