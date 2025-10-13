/**
 * 날짜 관련 유틸리티 함수
 */

/**
 * 두 날짜가 같은 날인지 비교 (시간 무시)
 * @param date1 첫 번째 날짜
 * @param date2 두 번째 날짜
 * @returns 같은 날이면 true
 */
export const isSameDate = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

/**
 * Date 객체를 YYYY-MM-DD 형식 문자열로 변환
 * @param date Date 객체
 * @returns YYYY-MM-DD 형식 문자열
 */
export const formatDateToString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/**
 * YYYY-MM-DD 형식 문자열을 Date 객체로 변환
 * @param dateString YYYY-MM-DD 형식 문자열
 * @returns Date 객체
 */
export const parseStringToDate = (dateString: string): Date => {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
};

/**
 * Date 객체를 YY/MM/DD 형식으로 포맷팅
 * @param date Date 객체
 * @returns YY/MM/DD 형식 문자열
 */
export const formatDateShort = (date: Date): string => {
  const year = String(date.getFullYear() % 100).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
};
