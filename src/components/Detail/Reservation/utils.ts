/**
 * 예약 관련 유틸리티 함수
 */

import type { AvailableSchedule, TimeSlot } from "./types";
import { isSameDate, parseStringToDate } from "../../../utils/date";

/**
 * 선택된 날짜의 예약 가능한 시간 조회
 * @param selectedDate 선택된 날짜
 * @param availableSchedules 예약 가능한 스케줄 목록
 * @returns 예약 가능한 시간 배열
 */
export const getAvailableTimesForDate = (
  selectedDate: Date | null,
  availableSchedules: AvailableSchedule[],
): TimeSlot[] => {
  if (!selectedDate) return [];

  const schedule = availableSchedules.find((schedule) => {
    const scheduleDate = parseStringToDate(schedule.date);
    return isSameDate(scheduleDate, selectedDate);
  });

  return schedule?.times || [];
};

/**
 * 선택된 시간 ID로 시간 정보 조회
 * @param selectedTimeId 선택된 시간 ID
 * @param availableSchedules 예약 가능한 스케줄 목록
 * @returns 시간 정보 또는 undefined
 */
export const getTimeById = (
  selectedTimeId: number | null,
  availableSchedules: AvailableSchedule[],
): TimeSlot | undefined => {
  if (selectedTimeId === null) return undefined;

  return availableSchedules
    .flatMap((schedule) => schedule.times)
    .find((time) => time.id === selectedTimeId);
};

