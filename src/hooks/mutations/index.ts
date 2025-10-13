/**
 * Mutations 훅 통합 export
 *
 * 모든 useMutation 커스텀 훅을 한 곳에서 import 가능
 *
 * @example
 * import { useLogin, useCreateActivity } from '@/hooks/mutations';
 */

// Auth
export { useLogin } from "./useLogin";
export { useSignUp } from "./useSignUp";

// Users
export { useUpdateMyProfile } from "./useUpdateMyProfile";
export { useUploadProfileImage } from "./useUploadProfileImage";

// Activities
export { useCreateActivity } from "./useCreateActivity";
export { useCreateReservation } from "./useCreateReservation";
export { useUploadActivityImage } from "./useUploadActivityImage";

// My Activities
export { useUpdateMyActivity } from "./useUpdateMyActivity";
export { useDeleteMyActivity } from "./useDeleteMyActivity";
export { useUpdateReservationStatus } from "./useUpdateReservationStatus";

// My Reservations
export { useCancelMyReservation } from "./useCancelMyReservation";
export { useCreateReservationReview } from "./useCreateReservationReview";

// My Notifications
export { useDeleteMyNotification } from "./useDeleteMyNotification";
