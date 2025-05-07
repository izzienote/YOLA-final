'use client';

import { parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toKoreanISOString } from '@/lib/utils/utc-to-kst';

type DatePickerProps = {
  date: string;
  setDate: (date: string) => void;
};

const DatePicker = ({ date, setDate }: DatePickerProps) => {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(date ? parseISO(date) : undefined);

  useEffect(() => {
    // 외부 date가 바뀌면 내부 selectedDate도 업데이트
    if (date) {
      setSelectedDate(parseISO(date));
    }
  }, [date]);

  const handleSelect = (selected: Date | undefined) => {
    if (selected) {
      setSelectedDate(selected);

      const changedDate = toKoreanISOString(selected); // 한국 시간 기준 ISO 문자열로 변환
      setDate(changedDate); // 외부로는 string 전달
      setOpen(false); // 모달 닫기
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex h-[45px] w-[208px] items-center justify-center text-left font-normal">
          <span className="text-lg text-secondary-grey-700">{date}</span>
          <CalendarIcon className="!h-[22px] !w-[22px] shrink-0 text-secondary-grey-700" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={selectedDate} onSelect={handleSelect} initialFocus locale={ko} />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
