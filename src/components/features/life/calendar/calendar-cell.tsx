import { clsx } from 'clsx';

// components/calendar/CalendarCell.tsx
const CalendarCell = ({
  date,
  isSelected,
  isOutside,
  onClick,
  renderDot
}: {
  date: Date;
  isSelected: boolean;
  isOutside: boolean;
  onClick: () => void;
  renderDot: (d: Date, o: boolean) => React.ReactNode;
}) => {
  return (
    <div
      data-value={!isOutside}
      className="inline-flex h-[88px] min-w-0 flex-1 flex-col items-center justify-start gap-1 overflow-hidden px-[2px] sm:h-[100px] sm:px-2 md:h-[110px]"
    >
      <button onClick={onClick} className="flex h-full w-full flex-col items-center justify-start gap-2.5">
        <div className={clsx('flex h-7 w-7 items-center justify-center rounded-full', isSelected && 'bg-amber-500')}>
          <span
            className={clsx(
              'text-base leading-none',
              isSelected ? 'font-bold text-white' : isOutside ? 'text-secondary-grey-300' : 'text-black'
            )}
          >
            {date.getDate()}
          </span>
        </div>
        {renderDot(date, isOutside)}
      </button>
    </div>
  );
};

export default CalendarCell;
