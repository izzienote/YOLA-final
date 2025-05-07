'use client';

import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameMonth } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import CalendarCell from '@/components/features/life/calendar/calendar-cell';
import CalendarHeader from '@/components/features/life/calendar/calendar-header';
import RenderDot from '@/components/features/life/calendar/calendar-render-dot';
import CalendarWeekdays from '@/components/features/life/calendar/calendar-weekdays';

interface Props {
  selectedDate: string;
  setDate: (date: string) => void;
  onMonthChange: (month: string) => void;
  dotMap: Record<string, Set<'mission' | 'normal'>>;
}

const CustomCalendar = ({ selectedDate, setDate, onMonthChange, dotMap }: Props) => {
  const [calendarMonth, setCalendarMonth] = useState(() => selectedDate.slice(0, 7));
  const [direction, setDirection] = useState<1 | -1 | 0>(1);
  const [displayMonth, setDisplayMonth] = useState(calendarMonth);

  const moveMonth = (diff: number) => {
    const baseDate = new Date(calendarMonth + '-01');
    const next = addMonths(baseDate, diff);
    const newMonth = format(next, 'yyyy-MM');
    setDirection(diff > 0 ? 1 : -1);
    setCalendarMonth(newMonth);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => moveMonth(1),
    onSwipedRight: () => moveMonth(-1),
    trackMouse: true
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplayMonth(calendarMonth);
      onMonthChange(calendarMonth);
    }, 0);
    return () => clearTimeout(timeout);
  }, [calendarMonth, onMonthChange]);

  const weeks = useMemo(() => {
    const baseDate = new Date(displayMonth + '-01');
    const start = startOfMonth(baseDate);
    const end = endOfMonth(baseDate);
    const startIdx = getDay(start);
    const endIdx = getDay(end);
    const allDays = eachDayOfInterval({
      start: new Date(start.getFullYear(), start.getMonth(), 1 - startIdx),
      end: new Date(end.getFullYear(), end.getMonth(), 6 - endIdx + end.getDate())
    });
    const weeks: Date[][] = [];
    for (let i = 0; i < allDays.length; i += 7) {
      weeks.push(allDays.slice(i, i + 7));
    }
    return weeks;
  }, [displayMonth]);

  const isSelected = (date: Date) => format(date, 'yyyy-MM-dd') === selectedDate;
  const isOutside = (date: Date) => !isSameMonth(date, new Date(displayMonth + '-01'));

  return (
    <div className="mx-auto w-full max-w-[1280px]">
      <CalendarHeader
        calendarMonth={calendarMonth}
        onMoveMonth={moveMonth}
        onResetToToday={() => {
          const today = format(new Date(), 'yyyy-MM-dd');
          setDate(today);
          const month = today.slice(0, 7);
          setDirection(0);
          setCalendarMonth(month);
        }}
      />

      <div className="flex flex-col items-center justify-start self-stretch" {...swipeHandlers}>
        <CalendarWeekdays />

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={displayMonth}
            custom={direction}
            initial={{ x: direction === 0 ? 0 : direction * 350, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction === 0 ? 0 : -direction * 350, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-start justify-start gap-1 self-stretch"
          >
            {weeks.map((week, rowIdx) => (
              <div key={rowIdx} className="inline-flex items-center justify-start self-stretch">
                {week.map((date) => {
                  const selected = isSelected(date);
                  const outside = isOutside(date);
                  const dateStr = format(date, 'yyyy-MM-dd');

                  return (
                    <CalendarCell
                      key={dateStr}
                      date={date}
                      isSelected={selected}
                      isOutside={outside}
                      onClick={() => {
                        if (outside) {
                          const newMonth = format(date, 'yyyy-MM');
                          setDirection(0);
                          setCalendarMonth(newMonth);
                        }
                        setDate(dateStr);
                      }}
                      renderDot={RenderDot(dotMap)}
                    />
                  );
                })}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CustomCalendar;
