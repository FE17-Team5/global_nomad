import { apiFetch } from "../apiClient";
import type {
  MyNotificationsListQuery,
  MyNotificationsListResponse,
} from "./types";

// 내 알림 리스트 조회
export async function getMyNotificationsList(
  query: MyNotificationsListQuery,
  authToken: string,
): Promise<MyNotificationsListResponse> {
  return apiFetch<MyNotificationsListResponse>(`/my-notifications`, {
    query,
    authToken,
  });
}

// 내 알림 삭제
export async function deleteMyNotification(
  notificationId: number,
  authToken: string,
): Promise<void> {
  return apiFetch<void>(`/my-notifications/${notificationId}`, {
    method: "DELETE",
    authToken,
  });
}
