'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import Calendar from '@/components/features/life/calendar/calendar';
import SoloLifeList from '@/components/features/life/solo-life-list';
import { PATH } from '@/constants/page-path';
import { useLifePostsByMonthRange } from '@/lib/hooks/queries/use-life-posts-by-month-range';
import { getNextMonth, getPrevMonth, getToday } from '@/lib/utils/get-date';
import { formatKoreanDate } from '@/lib/utils/utc-to-kst';

const LifePageClient = () => {
  const [selectedDate, setSelectedDate] = useState(getToday());
  const [calendarMonth, setCalendarMonth] = useState(getToday().slice(0, 7));
  const [isEmpty, setIsEmpty] = useState<boolean | null>(null);

  const prevMonth = getPrevMonth(calendarMonth);
  const nextMonth = getNextMonth(calendarMonth);

  const { data: posts = [] } = useLifePostsByMonthRange([prevMonth, calendarMonth, nextMonth]);

  const dotMap = useMemo(() => {
    const map: Record<string, Set<'mission' | 'normal'>> = {};
    posts.forEach((post) => {
      const date = post.date.slice(0, 10);
      const type = post.mission_id !== null ? 'mission' : 'normal';
      if (!map[date]) map[date] = new Set();
      map[date].add(type);
    });
    return map;
  }, [posts]);

  return (
    <div className="mt-[50px] flex w-full min-w-[425px] max-w-[1028px] select-none flex-col items-center px-2 md:px-4">
      <div className="w-full min-w-[343px] max-w-[1028px] px-4 sm:px-0">
        <Calendar
          setDate={setSelectedDate}
          selectedDate={selectedDate}
          dotMap={dotMap}
          onMonthChange={(month) => setCalendarMonth(month)}
        />
      </div>
      <hr className="mb-[40px] w-full border-secondary-grey-400"></hr>
      <div className="mb-[30px] flex w-full flex-row justify-between gap-1 text-left">
        <h2 className="whitespace-nowrap text-xl font-semibold text-secondary-grey-900">
          {formatKoreanDate(selectedDate)}
        </h2>
        {!isEmpty && (
          <Link href={PATH.LIFE_POST} className="whitespace-nowrap text-base text-secondary-grey-900 hover:underline">
            일기 작성하기 &gt;
          </Link>
        )}
      </div>

      <div className="mb-[55px] w-full">
        <SoloLifeList selectedDate={selectedDate} setIsEmpty={setIsEmpty} />
      </div>
    </div>
  );
};

export default LifePageClient;
