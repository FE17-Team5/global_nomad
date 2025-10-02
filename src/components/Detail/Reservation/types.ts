/**
 * 예약 관련 공통 타입 정의
 */

export interface TimeSlot {
  id: number;
  startTime: string;
  endTime: string;
}

export interface AvailableSchedule {
  date: string;
  times: TimeSlot[];
}

export interface ReservationState {
  selectedDate: Date | null;
  selectedTimeId: number | null;
  headCount: number;
}

// 예약 관련 상수
export const MAX_HEAD_COUNT = 10;
export const MIN_HEAD_COUNT = 1;
export const DEFAULT_HEAD_COUNT = 1;

