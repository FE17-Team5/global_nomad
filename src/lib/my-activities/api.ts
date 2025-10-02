import { apiFetch, TEAM_ID } from "../apiClient";
import type {
  ActivityReservationsQuery,
  ActivityReservationsResponse,
  MyActivitiesListQuery,
  MyActivitiesListResponse,
  MyActivityWithSchedules,
  ReservationDashboardQuery,
  ReservationDashboardResponse,
  ReservedScheduleQuery,
  ReservedScheduleResponse,
  UpdateMyActivityBody,
  UpdateReservationStatusBody,
  UpdateReservationStatusResponse,
} from "./types";

// 내 체험 리스트 조회
export async function getMyActivitiesList(
  query: MyActivitiesListQuery,
  authToken: string,
): Promise<MyActivitiesListResponse> {
  return apiFetch<MyActivitiesListResponse>(`/my-activities`, {
    query,
    authToken,
  });
}

// 월별 예약 현황 조회
export async function getReservationDashboard(
  activityId: number,
  query: ReservationDashboardQuery,
  authToken: string,
): Promise<ReservationDashboardResponse> {
  return apiFetch<ReservationDashboardResponse>(
    `/my-activities/${activityId}/reservation-dashboard`,
    {
      query,
      authToken,
    },
  );
}

// 날짜별 예약 카운트 조회
export async function getReservedSchedule(
  activityId: number,
  query: ReservedScheduleQuery,
  authToken: string,
): Promise<ReservedScheduleResponse> {
  return apiFetch<ReservedScheduleResponse>(
    `/my-activities/${activityId}/reserved-schedule`,
    {
      query,
      authToken,
    },
  );
}

// 시간대별 예약 내역 조회
export async function getActivityReservations(
  activityId: number,
  query: ActivityReservationsQuery,
  authToken: string,
): Promise<ActivityReservationsResponse> {
  return apiFetch<ActivityReservationsResponse>(
    `/my-activities/${activityId}/reservations`,
    {
      query,
      authToken,
    },
  );
}

// 예약 상태 변경
export async function updateReservationStatus(
  activityId: number,
  reservationId: number,
  body: UpdateReservationStatusBody,
  authToken: string,
): Promise<UpdateReservationStatusResponse> {
  return apiFetch<UpdateReservationStatusResponse>(
    `/my-activities/${activityId}/reservations/${reservationId}`,
    {
      method: "PATCH",
      body,
      authToken,
    },
  );
}

// 내 체험 삭제
export async function deleteMyActivity(
  activityId: number,
  authToken: string,
): Promise<void> {
  return apiFetch<void>(`/my-activities/${activityId}`, {
    method: "DELETE",
    authToken,
  });
}

// 내 체험 수정
export async function updateMyActivity(
  activityId: number,
  body: UpdateMyActivityBody,
  authToken: string,
): Promise<MyActivityWithSchedules> {
  return apiFetch<MyActivityWithSchedules>(
    `/my-activities/${activityId}`,
    {
      method: "PATCH",
      body,
      authToken,
    },
  );
}
