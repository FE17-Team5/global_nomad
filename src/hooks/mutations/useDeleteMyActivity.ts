/**
 * useDeleteMyActivity
 *
 * 내 체험 삭제 mutation 훅
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMyActivity } from "../../lib/my-activities/api";

export const useDeleteMyActivity = (authToken: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (activityId: number) => deleteMyActivity(activityId, authToken),
    onSuccess: () => {
      // 일반 목록 + 무한스크롤 목록 모두 갱신
      queryClient.invalidateQueries({
        queryKey: ["my-activities"],
        exact: false,
      });
    },
  });
};
