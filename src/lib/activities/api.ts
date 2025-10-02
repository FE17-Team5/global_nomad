import { apiFetch } from "../apiClient";
import type {
  ActivitiesListQuery,
  ActivitiesListResponse,
  ActivityDetail,
  ActivityReviewsQuery,
  ActivityReviewsResponse,
  ActivityWithSchedules,
  AvailableScheduleQuery,
  AvailableScheduleResponse,
  CreateActivityBody,
  CreateReservationBody,
  CreateReservationResponse,
  UploadImageResponse,
} from "./types";

// 체험 목록 조회
export async function getActivitiesList(
  query: ActivitiesListQuery,
): Promise<ActivitiesListResponse> {
  return apiFetch<ActivitiesListResponse>(`/activities`, { query });
}

// 체험 상세 조회
export async function getActivityDetail(
  activityId: number,
): Promise<ActivityDetail> {
  return apiFetch<ActivityDetail>(`/activities/${activityId}`);
}

// 체험 등록
export async function createActivity(
  body: CreateActivityBody,
  authToken: string,
): Promise<ActivityWithSchedules> {
  return apiFetch<ActivityWithSchedules>(`/activities`, {
    method: "POST",
    body,
    authToken,
  });
}

// 예약 가능일 조회
export async function getAvailableSchedule(
  activityId: number,
  query: AvailableScheduleQuery,
): Promise<AvailableScheduleResponse> {
  return apiFetch<AvailableScheduleResponse>(
    `/activities/${activityId}/available-schedule`,
    {
      query,
    },
  );
}

// 체험 리뷰 조회
export async function getActivityReviews(
  activityId: number,
  query: ActivityReviewsQuery = {},
): Promise<ActivityReviewsResponse> {
  return apiFetch<ActivityReviewsResponse>(
    `/activities/${activityId}/reviews`,
    {
      query,
    },
  );
}

// 체험 예약 신청
export async function createReservation(
  activityId: number,
  body: CreateReservationBody,
  authToken: string,
): Promise<CreateReservationResponse> {
  return apiFetch<CreateReservationResponse>(
    `/activities/${activityId}/reservations`,
    {
      method: "POST",
      body,
      authToken,
    },
  );
}

// 체험 이미지 업로드
export async function uploadActivityImage(
  imageFile: File,
  authToken: string,
): Promise<UploadImageResponse> {
  const formData = new FormData();
  formData.append("image", imageFile);

  return apiFetch<UploadImageResponse>(`/activities/image`, {
    method: "POST",
    body: formData,
    authToken,
  });
}
