/**
 * useDeleteMyActivity
 *
 * 내 체험 삭제 mutation 훅
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMyActivity } from "../../lib/my-activities/api";
import { qk } from "../../lib/queryKeys";

export const useDeleteMyActivity = (authToken: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (activityId: number) => deleteMyActivity(activityId, authToken),
    onSuccess: () => {
      // 내 체험 목록 갱신
      queryClient.invalidateQueries({ queryKey: qk.myActivities() });
    },
  });
};
