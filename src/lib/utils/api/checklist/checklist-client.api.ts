import { FAIL } from '@/constants/messages';
import { missionTypeMap, validMissionTags } from '@/constants/mission';
import { TABLE } from '@/constants/supabase-tables-name';
import { supabase } from '@/lib/utils/supabase/supabase-client';
import type { MissionWithStatus, UserLevelByMissionType } from '@/types/checklist';
import type { EnumChecklist, EnumLevel, TableMissionList, TableUserLevel } from '@/types/supabase-const';

/** getUserLevelByMission: 클라이언트 전용 유저 레벨 정보 불러오기
 *
 * @async
 * @function getUserLevelByMission
 * @param {UserLevelByMissionType} params - 유저 ID와 미션 한글 이름을 포함한 객체
 * @param {string} params.userId - 레벨 정보를 조회할 유저의 ID
 * @param {string} params.decodedMission - 한글 미션 이름 (예: '혼밥', '청소', '혼자놀기' 등)
 * @returns {Promise<number>} 해당 미션에 대한 유저의 현재 레벨 (문자열 → 숫자 변환, 기본값은 1)
 * @throws {Error} 미션 이름이 유효하지 않거나 Supabase 쿼리 실행 중 오류가 발생할 경우 에러 발생
 */
export const getUserLevelByMission = async ({ userId, decodedMission }: UserLevelByMissionType): Promise<string> => {
  const col = missionTypeMap[decodedMission];
  if (!col) {
    throw new Error(`${FAIL.INVALID_MISSION_TYPE}: ${decodedMission}`);
  }
  const { data, error } = (await supabase.from(TABLE.USER_LEVEL).select(col).eq('user_id', userId).single()) as {
    data: Pick<TableUserLevel, typeof col>;
    error: unknown;
  };
  if (error) throw new Error('getUserLevelByMission 오류');

  return String(data[col]);
};

/** getMissionListByLevel: 클라이언트 전용 미션 리스트 데이터 불러오기 (미션 타입 + 유저 레벨 기반)
 *
 * @async
 * @function getMissionListByLevel
 * @param {string} mission - 조회할 미션의 `type` 값 (예: '혼자놀기')
 * @param {number} userLevel - 유저의 현재 레벨 값 (예: 1, 2, 3 등)
 * @returns {Promise<TableMissionList[]>} `mission_list` 테이블에서 해당 타입과 레벨에 맞는 미션 배열
 * @throws {Error} Supabase 쿼리 실행 중 오류 발생 시 throw Error
 */
export const getMissionListByLevel = async (
  mission: EnumChecklist,
  userLevel: EnumLevel
): Promise<TableMissionList[]> => {
  const { data, error } = await supabase
    .from(TABLE.MISSION_LIST)
    .select('*')
    .eq('type', mission)
    .eq('level', userLevel);

  if (error) throw new Error(error.message);
  return data;
};

/** getCompletedMissionIds: 클라이언트 전용 유저가 완료한 미션 ID 리스트 반환
 *
 * @async
 * @function getCompletedMissionIds
 * @param {Object} params - 함수 매개변수 객체
 * @param {string} params.userId - 조회할 유저의 ID
 * @param {number[]} params.missionIds - 조회 대상이 되는 미션 ID 배열
 * @returns {Promise<number[]>} 유저가 완료한 미션 ID 배열만 필터링하여 반환
 * @throws {Error} Supabase 쿼리 실행 중 오류 발생 시 에러 throw
 * */
export const getCompletedMissionIds = async ({
  userId,
  missionIds
}: {
  userId: string;
  missionIds: number[];
}): Promise<number[]> => {
  const { data, error } = await supabase
    .from(TABLE.USER_MISSION)
    .select('completed_id')
    .eq('user_id', userId)
    .in('completed_id', missionIds);

  if (error) throw new Error(error.message);
  return data.map((item: { completed_id: number }) => item.completed_id);
};

/** getChecklistData: 체크리스트 페이지에 필요한 모든 데이터를 한 번에 가져오는 클라이언트 전용 함수
 *
 * @async
 * @function getChecklistData
 * @param {Object} params - 함수 매개변수 객체
 * @param {string} params.mission - 체크리스트 미션 타입 (예: '혼자놀기')
 * @param {string} params.userId - 현재 로그인한 유저의 ID
 * @returns {Promise<{
 *   decodedMission: EnumChecklist; // 미션 타입
 *   userId: string | null; // 유저 ID
 *   userLevel: string; // 유저 레벨
 *   progress: number; // 진행도
 *   missionList: MissionWithStatus[]; // 미션 리스트
 * }>} 체크리스트 페이지에 필요한 모든 데이터
 * @throws {Error} 미션 타입이 유효하지 않거나 Supabase 쿼리 실행 중 오류가 발생할 경우 에러 발생
 */
export const getChecklistData = async ({
  mission,
  userId
}: {
  mission: string;
  userId: string | null;
}): Promise<{
  decodedMission: EnumChecklist;
  userId: string | null;
  userLevel: string;
  progress: number;
  missionList: MissionWithStatus[];
}> => {
  // 1. 미션 타입 디코딩 및 유효성 검사
  const decoded = decodeURIComponent(mission);
  if (!validMissionTags.includes(decoded as EnumChecklist)) {
    throw new Error(`${FAIL.INVALID_MISSION_TYPE}: ${decoded}`);
  }
  const decodedMission = decoded as EnumChecklist;

  // 2. 유저 레벨 설정
  let userLevel = '1'; // 기본 레벨 (비로그인 사용자)
  if (userId) {
    userLevel = await getUserLevelByMission({ userId, decodedMission });
  }

  // 3. 마스터 레벨 처리
  const targetLevel = userLevel === 'master' && userId ? '5' : userLevel;

  // 4. 미션 리스트 가져오기
  const missionList = await getMissionListByLevel(decodedMission, targetLevel as EnumLevel);
  const missionIds = missionList.map((m) => m.id);

  // 5. 완료된 미션 ID 가져오기
  let completedIds: number[] = [];
  if (userId) {
    completedIds = await getCompletedMissionIds({ userId, missionIds });
  }

  // 6. 진행도 계산 (마스터 레벨이고 진행도가 0일 때는 전체 미션 수를 진행도로 설정)
  const progress = userLevel === 'master' && completedIds.length === 0 ? missionList.length : completedIds.length;

  // 7. 미션 리스트에 완료 상태 추가
  const missionListWithStatus = missionList.map((mission) => ({
    ...mission,
    completed: completedIds.includes(mission.id)
  }));

  return {
    decodedMission,
    userId,
    userLevel: targetLevel,
    progress,
    missionList: missionListWithStatus
  };
};
