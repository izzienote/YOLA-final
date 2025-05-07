interface LevelInfo {
  level: string;
  remainingMissions: number | null; // null은 이미 최상위(Master)일 때
}
/**
 *
 * @function calculateUserLevel - 유저의 전체 레벨 단계를 판별하고 다음 단계까지 남은 미션 수를 반환
 * @param totalCount - 유저가 달성한 전체 미션 개수 (number)
 * @returns - { level, remainingMissions }
 */
export const calculateUserLevel = (totalCount: number): LevelInfo => {
  if (totalCount >= 125) {
    return { level: USER_LEVELS.MASTER, remainingMissions: null }; // 최종단계
  }
  if (totalCount >= 100) {
    return { level: USER_LEVELS.EXPERT, remainingMissions: 125 - totalCount };
  }
  if (totalCount >= 75) {
    return { level: USER_LEVELS.INTERMEDIATE, remainingMissions: 100 - totalCount };
  }
  if (totalCount >= 50) {
    return { level: USER_LEVELS.NOVICE, remainingMissions: 75 - totalCount };
  }
  if (totalCount >= 25) {
    return { level: USER_LEVELS.BEGINNER, remainingMissions: 50 - totalCount };
  }
  if (totalCount >= 0) {
    return { level: USER_LEVELS.START, remainingMissions: 25 - totalCount };
  }
  return { level: '알 수 없음', remainingMissions: null };
};

export const USER_LEVELS = {
  START: 'START',
  BEGINNER: '입문',
  NOVICE: '초보',
  INTERMEDIATE: '중수',
  EXPERT: '고수',
  MASTER: '마스터'
} as const;
