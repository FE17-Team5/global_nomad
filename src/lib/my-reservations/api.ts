import { apiFetch } from "../apiClient";
import type {
  CancelMyReservationBody,
  CancelMyReservationResponse,
  CreateReservationReviewBody,
  CreateReservationReviewResponse,
  MyReservationsListQuery,
  MyReservationsListResponse,
} from "./types";

// 내 예약 리스트 조회
export async function getMyReservationsList(
  query: MyReservationsListQuery,
  authToken: string,
): Promise<MyReservationsListResponse> {
  return apiFetch<MyReservationsListResponse>(`/my-reservations`, {
    query,
    authToken,
  });
}

// 내 예약 취소
export async function cancelMyReservation(
  reservationId: number,
  body: CancelMyReservationBody,
  authToken: string,
): Promise<CancelMyReservationResponse> {
  return apiFetch<CancelMyReservationResponse>(
    `/my-reservations/${reservationId}`,
    {
      method: "PATCH",
      body,
      authToken,
    },
  );
}

// 내 예약 리뷰 작성
export async function createReservationReview(
  reservationId: number,
  body: CreateReservationReviewBody,
  authToken: string,
): Promise<CreateReservationReviewResponse> {
  return apiFetch<CreateReservationReviewResponse>(
    `/my-reservations/${reservationId}/reviews`,
    {
      method: "POST",
      body,
      authToken,
    },
  );
}
