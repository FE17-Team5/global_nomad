/**
 * Queries 훅 통합 export
 *
 * 모든 useQuery 커스텀 훅을 한 곳에서 import 가능
 *
 * @example
 * import { useActivityDetail, useActivitiesList } from '@/hooks/queries';
 */

// Activities
export { useActivitiesList } from "./useActivitiesList";
export { useActivityDetail } from "./useActivityDetail";
export { useAvailableSchedule } from "./useAvailableSchedule";
export { useActivityReviews } from "./useActivityReviews";

// Users
export { useMyProfile } from "./useMyProfile";

// My Activities
export { useMyActivitiesList } from "./useMyActivitiesList";
export { useReservationDashboard } from "./useReservationDashboard";
export { useReservedSchedule } from "./useReservedSchedule";
export { useActivityReservations } from "./useActivityReservations";

// My Reservations
export { useMyReservationsList } from "./useMyReservationsList";

// My Notifications
export { useMyNotificationsList } from "./useMyNotificationsList";
