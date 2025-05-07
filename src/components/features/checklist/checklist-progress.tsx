import { clsx } from 'clsx';
import { Lock, Unlock } from 'lucide-react';
import type { EnumLevel } from '@/types/supabase-const';

interface ChecklistProgressProps {
  progress: number;
  userLevel: EnumLevel;
  isMaster: boolean;
}

const ChecklistProgress = ({ progress, userLevel, isMaster }: ChecklistProgressProps) => {
  const TOTAL_LEVELS = 5;
  const levels = ['1단계', '2단계', '3단계', '4단계', '5단계'];

  const progressBar = Array.from({ length: TOTAL_LEVELS }, (_, i) => {
    const level = (i + 1).toString();
    const isPast = Number(level) < Number(userLevel);
    const isCurrent = level === userLevel;

    if (isMaster) return { type: 'master' as const };
    if (isPast) return { type: 'full' as const };
    if (isCurrent) return { type: 'partial' as const, completed: progress };
    return { type: 'empty' as const };
  });

  return (
    <section>
      <div className="relative flex-1 md:pt-2">
        <div className="flex flex-col gap-1">
          {/* 모바일 레이블: 진행도 텍스트 */}
          <div className="relative flex w-full justify-between pb-[6px] md:hidden">
            {Array.from({ length: 5 }).map((_, idx) => {
              return (
                <div
                  key={idx}
                  className={clsx(
                    'text-gray-secondary-900 w-1/5 text-center text-[12px] font-normal leading-[1.4]',
                    (idx + 1).toString() === userLevel ? 'visible' : 'invisible'
                  )}
                >
                  {`${progress} / 5`}
                </div>
              );
            })}
          </div>
          {/* 진행도 바 */}
          <div className="flex h-3 w-full gap-[4px] overflow-hidden rounded-md">
            {progressBar.map((bar, idx) => {
              if (bar.type === 'master') return <div key={idx} className="flex-1 bg-mission-line" />;
              if (bar.type === 'full') return <div key={idx} className="flex-1 bg-primary-orange-400" />;
              if (bar.type === 'partial') {
                return (
                  <div key={idx} className="flex-1">
                    {/* 모바일 */}
                    <div className="flex h-3 w-full bg-secondary-grey-400 md:hidden">
                      <div className="h-3 bg-primary-orange-400" style={{ width: `${(bar.completed / 5) * 100}%` }} />
                    </div>
                    {/* 데스크탑 */}
                    <div className="hidden min-h-3 w-full gap-[2px] md:flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className={clsx(
                            'flex-1',
                            i < Math.min(bar.completed, 5) ? 'bg-primary-orange-400' : 'bg-secondary-grey-400'
                          )}
                        />
                      ))}
                    </div>
                  </div>
                );
              }
              return <div key={idx} className="flex-1 bg-secondary-grey-200" />;
            })}
          </div>

          {/* 단계 말풍선 */}
          <div className="flex w-full justify-between">
            {levels.map((label, idx) => {
              const level = (idx + 1).toString();
              const isPast = Number(level) < Number(userLevel);
              const isCurrent = level === userLevel;

              return (
                <div key={idx} className="flex w-1/5 justify-center">
                  <div className="relative flex flex-col items-center">
                    {isCurrent && (
                      <div className="-mb-3 mt-[4px] border-x-8 border-b-8 border-x-transparent border-b-secondary-grey-900 md:-mb-4 md:mt-[10px]" />
                    )}
                    <span
                      className={clsx(
                        'mt-[10px] inline-flex items-center gap-1 rounded-[12px] md:mt-[14px]',
                        isCurrent
                          ? 'h-[37px] w-[63px] bg-secondary-grey-900 py-[10px] pl-[8px] text-[12px] text-white md:h-[42px] md:w-[79px] md:py-2.5 md:pl-[12px] md:text-[16px]'
                          : 'h-[38px] w-[38px] border border-secondary-grey-400 text-[12px] font-normal text-secondary-grey-800 md:h-[41px] md:w-[71px] md:py-2.5 md:pl-[12px]',
                        !isCurrent && 'justify-center md:justify-start'
                      )}
                    >
                      <span className={clsx('md:inline', !isCurrent && 'hidden')}>{label}</span>
                      {isPast || isCurrent ? (
                        <Unlock className="h-[16px] w-[16px] shrink-0" />
                      ) : (
                        <Lock className="h-[14px] w-[14px] shrink-0" />
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChecklistProgress;
