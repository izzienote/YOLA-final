import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarHeaderProps {
  calendarMonth: string;
  onMoveMonth: (diff: number) => void;
  onResetToToday: () => void;
}

const CalendarHeader = ({ calendarMonth, onMoveMonth, onResetToToday }: CalendarHeaderProps) => {
  return (
    <div className="mb-5 flex w-full items-center justify-between px-[20px] md:px-[40px]">
      <div className="hidden w-[61px] sm:invisible sm:block">a</div>
      {/* 가운데 정렬된 월 + 화살표 */}
      <div className="flex items-center justify-center gap-4 sm:gap-[56px]">
        <button
          onClick={() => onMoveMonth(-1)}
          className="flex h-6 w-6 items-center justify-center"
          aria-label="이전 달"
        >
          <ChevronLeft className="h-6 w-6 text-secondary-grey-900" />
        </button>
        <div className="text-center text-lg font-semibold leading-6 text-secondary-grey-900 sm:text-xl">
          {calendarMonth.replace('-', '.')}
        </div>
        <button
          onClick={() => onMoveMonth(1)}
          className="flex h-6 w-6 items-center justify-center"
          aria-label="다음 달"
        >
          <ChevronRight className="h-6 w-6 text-secondary-grey-900" />
        </button>
      </div>

      {/* TODAY 버튼 */}
      <button
        onClick={onResetToToday}
        className="mt-2 h-[28px] w-[61px] rounded text-sm outline outline-1 outline-secondary-grey-900 sm:mt-0"
      >
        TODAY
      </button>
    </div>
  );
};

export default CalendarHeader;
