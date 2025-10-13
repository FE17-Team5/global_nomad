/**
 * Reservation 모듈 통합 export
 *
 * 예약 관련 모든 컴포넌트, 타입, 유틸, 상수를 한 곳에서 import 가능
 *
 * @example
 * import { ReservationSidebar, MAX_HEAD_COUNT } from '@/components/Detail/Reservation';
 */

// Components
export { default as ReservationSidebar } from "./ReservationSidebar";
export { default as FixedReservationBar } from "./FixedReservationBar";

// Types
export type {
  TimeSlot,
  AvailableSchedule,
  ReservationState,
} from "./types";

export {
  MAX_HEAD_COUNT,
  MIN_HEAD_COUNT,
  DEFAULT_HEAD_COUNT,
} from "./types";

// Utils
export { getAvailableTimesForDate, getTimeById } from "./utils";

// Constants
export { RESERVATION_UI_HEIGHTS, BORDER_RADIUS } from "./constants";
