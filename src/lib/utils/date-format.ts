import { getKoreanDate } from '@/lib/utils/utc-to-kst';

/**
 * formatRelativeDate
 * 주어진 날짜와 현재 시간의 차이를 계산하여 KST 상대 시간 문자열로 반환합니다.
 *
 * - 1분 미만: "지금"
 * - 1시간 미만: "N분 전"
 * - 24시간 미만: "N시간 전"
 * - 2일 미만: "N일 전"
 * - 2일 이상: "MM/DD" 형식의 날짜 문자열
 *
 * @param dateInput - 날짜 문자열 또는 Date 객체
 * @returns KST 기준 상대 시간 문자열 (예: "지금",  "15분 전", "3시간 전", "1일 전", "4/1")
 */
export const formatRelativeDate = (dateInput: string | Date): string => {
  const now = getKoreanDate();
  const target = typeof dateInput === 'string' ? getKoreanDate(new Date(dateInput)) : getKoreanDate(dateInput);

  const diffMs = now.getTime() - target.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) {
    return '지금';
  }

  if (diffMinutes < 60) {
    return `${diffMinutes}분 전`;
  }

  if (diffHours < 24) {
    return `${diffHours}시간 전`;
  }

  if (diffDays < 2) {
    return `${diffDays}일 전`;
  }

  return `${String(target.getFullYear()).slice(-2)}.${String(target.getMonth() + 1).padStart(2, '0')}.${String(target.getDate()).padStart(2, '0')}`; // 디자인 시안 반영
};
