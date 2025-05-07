'use client';

import { ChevronDown } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { PATH } from '@/constants/page-path';
import type { TableMissionList } from '@/types/supabase-const';

type ChecklistPostDropdownProps = {
  missions: TableMissionList[];
  completedIds?: number[];
  selectedId: number | null;
  onSelect: (id: number) => void;
};

/**
 * getMissionDropdownData: 특정 미션 ID 기반으로 드롭다운용 미션 리스트 및 완료된 미션 ID 리스트 반환
 *
 * @async
 * @function getMissionDropdownData
 * @param {Object} params - 함수 매개변수 객체
 * @param {string} params.userId - 현재 로그인한 유저의 ID
 * @param {number} params.missionId - 현재 선택된 미션 ID
 * @returns {Promise<{ missions: TableMissionList[]; completedIds: number[] }>}
 * - `missions`: 현재 미션과 동일한 타입 및 레벨의 미션 목록
 * - `completedIds`: 해당 유저가 이미 완료한 미션 ID 리스트
 * @throws {Error} - 미션 메타 정보가 없거나 Supabase 쿼리 중 에러가 발생할 경우 에러 throw
 */
const ChecklistPostDropdown = ({ missions, completedIds = [], selectedId, onSelect }: ChecklistPostDropdownProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const selected = missions.find((m) => m.id === selectedId);

  const handleSelect = (id: number) => {
    onSelect(id);
    setOpen(false);

    const params = new URLSearchParams(searchParams.toString());
    params.set('mission_id', id.toString());
    router.replace(`${PATH.LIFE_POST}?${params.toString()}`); // 미션 변경 시 URL 경로 수정
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-[45px] w-full min-w-[360px] justify-between">
          {selected ? selected.content : '미션 선택'}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full">
        {missions.map((mission) => (
          <DropdownMenuItem
            key={mission.id}
            onSelect={() => handleSelect(mission.id)}
            disabled={completedIds.includes(mission.id)}
            className={completedIds.includes(mission.id) ? 'text-gray-400' : ''}
          >
            {mission.content}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChecklistPostDropdown;
