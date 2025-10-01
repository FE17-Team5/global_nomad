import { apiFetch, TEAM_ID } from "../apiClient";
import type {
  MyReservationsListQuery,
  MyReservationsListResponse,
  CancelMyReservationBody,
  CancelMyReservationResponse,
  CreateReservationReviewBody,
  CreateReservationReviewResponse,
} from "./types";

// 내 예약 리스트 조회
export async function getMyReservationsList(
  query: MyReservationsListQuery,
  authToken: string,
): Promise<MyReservationsListResponse> {
  return apiFetch<MyReservationsListResponse>(`/${TEAM_ID}/my-reservations`, {
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
    `/${TEAM_ID}/my-reservations/${reservationId}`,
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
    `/${TEAM_ID}/my-reservations/${reservationId}/reviews`,
    {
      method: "POST",
      body,
      authToken,
    },
  );
}
