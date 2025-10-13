/**
 * useMyNotificationsList
 *
 * 내 알림 목록 조회 훅
 */

import { useQuery } from "@tanstack/react-query";
import { getMyNotificationsList } from "../../lib/my-notifications/api";
import type { MyNotificationsListQuery } from "../../lib/my-notifications/types";
import { qk } from "../../lib/queryKeys";

export const useMyNotificationsList = (
  params: MyNotificationsListQuery,
  authToken: string | null | undefined,
) => {
  return useQuery({
    queryKey: qk.myNotifications(params),
    queryFn: () => getMyNotificationsList(params, authToken!),
    enabled: !!authToken,
  });
};
