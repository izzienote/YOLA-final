import { TZDate } from '@date-fns/tz';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

// 한국 시간 기준 ISO 문자열로 변환 (KST 기준 날짜 문자열 ('YYYY-MM-DD'))
export const toKoreanISOString = (date: Date) => {
  const offset = 9 * 60; // KST는 UTC+9
  const local = new Date(date.getTime() + offset * 60 * 1000);
  return local.toISOString().slice(0, 10); // 'YYYY-MM-DD'
};

/**
 * getKoreanDate
 * 주어진 날짜 또는 현재 시간을 KST 기준으로 보정한 Date 객체 반환
 *
 * @param date - 기준 날짜 (기본값: 현재 시간)
 * @returns KST 기준 Date 객체
 */
export const getKoreanDate = (date: Date = new Date()): Date => {
  const utc = date.getTime() + date.getTimezoneOffset() * 60 * 1000;
  return new Date(utc + 9 * 60 * 60 * 1000); // KST = UTC+9
};

/**
 * getKoreanDate
 * 입력된 날짜를 KST 기준으로 변환하고
 * "YY.MM.DD. HH:mm" 형식으로 출력합니다 (띄어쓰기 없음)
 *
 * @param date - 변환할 날짜 (Date 객체 또는 ISO 문자열)
 * @returns 포맷된 KST 기준 날짜 문자열 (예: "25.04.10 15:30")
 */
export const getKoreanDateTime = (date: Date | string): string => {
  const kstDate = getKoreanDate(new Date(date));

  const yy = String(kstDate.getFullYear()).slice(2); // 2자리 연도
  const mm = String(kstDate.getMonth() + 1).padStart(2, '0');
  const dd = String(kstDate.getDate()).padStart(2, '0');
  const hh = String(kstDate.getHours()).padStart(2, '0');
  const min = String(kstDate.getMinutes()).padStart(2, '0');

  return `${yy}.${mm}.${dd}. ${hh}:${min}`; // 예: "25.04.10. 15:30"
};

/**
 * formatKoreanDate
 * ISO 형식의 날짜 문자열을 한국어 날짜 포맷으로 변환합니다.
 * "M월 d일 EEEE" 형식으로 출력하며, 요일은 한글로 표시됩니다.
 *
 * @param dateStr - 변환할 날짜 문자열 (예: "2025-04-22")
 * @returns 포맷된 날짜 문자열 (예: "4월 22일 화요일")
 */
export const formatKoreanDate = (dateStr: string): string => {
  const date = parseISO(dateStr); // "2025-04-22" → Date 객체
  return format(date, 'M월 d일 EEEE', { locale: ko });
};

/**
 * 라이브러리를 사용하여 정확한 시간을 가져옵니다
 * newSeoulISOString()을 하면 사용할 수 있습니다
 */
const newTimeZonedISOString = (timezone: string) => TZDate.tz(timezone, Date.now()).toISOString();
export const newSeoulISOString = () => newTimeZonedISOString('Asia/Seoul');
