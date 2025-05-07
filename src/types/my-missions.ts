import type { EnumChecklist } from '@/types/supabase-const';

/**
 * Supabase의 user_mission 테이블에서 join된 mission_list 컬럼 구조만 따로 정의
 * - mission_list 안에는 type과 level이 string으로 들어있음
 */
export type UserMissionRow = {
  mission_list: {
    type: string;
    level: string;
  };
};

/**
 * getLevelsByTypes 유틸 함수에 전달할 미션 데이터 타입
 * - UsedTags를 기반으로 정확한 타입 보장
 * - level은 string으로 유지 (계산 시 parseInt로 처리)
 */
export type Mission = {
  type: EnumChecklist;
  level: string;
};
