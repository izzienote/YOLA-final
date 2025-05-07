'use client';

import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import type { SortBy } from '@/types/life-post';

interface SelectBoxProps {
  value: string;
  onChange: (sort: SortBy) => void;
}

export function SelectBox({ value, onChange }: SelectBoxProps) {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = isOpen && scrollbarWidth > 0 ? `${scrollbarWidth}px` : '0';
  };

  useEffect(() => {
    return () => {
      document.body.style.paddingRight = '0';
    };
  }, []);

  return (
    <Select value={value} onValueChange={onChange} onOpenChange={handleOpenChange} open={open}>
      <SelectTrigger className="h-[44px] w-[120px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="all">전체 보기</SelectItem>
          <SelectSeparator />
          <SelectItem value="mission">미션 보기</SelectItem>
          <SelectSeparator />
          <SelectItem value="diary">일기 보기</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
