import type { Mission, UserMissionRow } from '@/types/my-missions';
import type { EnumChecklist } from '@/types/supabase-const';

/**
 * Supabase에서 가져온 미션 데이터 배열을 가공하여 레벨 계산 로직에 적합한 형태로 변환
 *
 * 사용 목적:
 * - Supabase에서 getUserMission API함수로 받아온 데이터에는 mission_list 안에 type, level 정보가 중첩되어 있음
 * - 이 데이터에서 mission_list의 { type, level } 형태만 뽑아서 배열로 반환
 * - 이후 레벨 계산 함수(getLevelsByTypes)에서 사용하기 위함
 *
 * @param rawMissions Supabase의 user_mission 테이블에서 받아온 원본 미션 데이터 배열
 * @returns Mission[] - 레벨 계산에 사용할 수 있도록 변환된 미션 데이터
 * @data_example
 * 1. rawMissions 배열 (인자값)
 * [
  {
    id: 82,
    created_at: '2025-04-22T10:58:18.142959+00:00',
    user_id: '79a5ab91-4356-4838-9e98-6fadd27b6fe1',
    completed_id: 147,
    mission_list: { type: '혼밥', level: '1' }
  }
]
  2. @function parseUserMissions 반환값 (리턴값)
  [ { type: '혼밥', level: '1' } ] 
  */
export function parseUserMissions(rawMissions: UserMissionRow[]): Mission[] {
  return rawMissions
    .map((mission) => {
      const type = mission.mission_list.type;
      const level = mission.mission_list.level;

      return {
        type: type as EnumChecklist,
        level: level
      };
    })
    .filter((mission): mission is Mission => mission !== null);
}
