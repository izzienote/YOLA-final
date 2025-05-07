// components/calendar/calendar-render-dot.tsx
import { format } from 'date-fns';

const RenderDot = (
  dotMap: Record<string, Set<'mission' | 'normal'>>
): ((date: Date, isOutside: boolean) => React.ReactNode) => {
  const DotComponent = (date: Date, isOutside: boolean) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const dots = dotMap[dateStr];
    const dotTextColor = isOutside ? 'text-secondary-grey-300' : 'text-zinc-500';
    const normalColor = isOutside ? 'bg-secondary-grey-300' : 'bg-secondary-grey-800';

    return (
      <div className="flex h-14 w-full select-none flex-col items-center justify-start gap-1 overflow-hidden px-2.5 py-[3px]">
        <div className="flex flex-row items-start justify-start gap-0.5 md:flex-col">
          {dots?.has('mission') && (
            <div className="inline-flex items-center justify-start gap-1">
              <div
                className={`h-2 w-2 rounded-full ${isOutside ? 'bg-calendar-mission opacity-50' : 'bg-calendar-mission'}`}
              />
              <div
                className={`hidden justify-center text-center text-xs font-normal leading-none ${dotTextColor} md:block`}
              >
                미션인증
              </div>
            </div>
          )}
          {dots?.has('normal') && (
            <div className="inline-flex items-center justify-start gap-1">
              <div className={`h-2 w-2 rounded-full ${normalColor}`} />
              <div
                className={`hidden justify-center text-center text-xs font-normal leading-none ${dotTextColor} md:block`}
              >
                하루일기
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  DotComponent.displayName = 'RenderDotCell';
  return DotComponent;
};

export default RenderDot;
