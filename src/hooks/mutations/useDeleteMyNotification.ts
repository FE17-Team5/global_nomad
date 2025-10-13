/**
 * useDeleteMyNotification
 *
 * 내 알림 삭제 mutation 훅
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMyNotification } from "../../lib/my-notifications/api";
import { qk } from "../../lib/queryKeys";

export const useDeleteMyNotification = (authToken: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: number) =>
      deleteMyNotification(notificationId, authToken),
    onSuccess: () => {
      // 알림 목록 갱신
      queryClient.invalidateQueries({ queryKey: qk.myNotifications() });
    },
  });
};
