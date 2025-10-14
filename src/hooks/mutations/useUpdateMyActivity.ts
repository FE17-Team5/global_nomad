/**
 * useUpdateMyActivity
 *
 * 내 체험 수정 mutation 훅
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMyActivity } from "../../lib/my-activities/api";
import type { UpdateMyActivityBody } from "../../lib/my-activities/types";
import { qk } from "../../lib/queryKeys";

export const useUpdateMyActivity = (activityId: number, authToken: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: UpdateMyActivityBody) =>
      updateMyActivity(activityId, body, authToken),
    onSuccess: () => {
      // 해당 체험 상세 정보 갱신
      queryClient.invalidateQueries({
        queryKey: qk.activityDetail(activityId),
      });
      // 내 체험 목록 갱신 (일반 + 무한스크롤)
      queryClient.invalidateQueries({
        queryKey: ["my-activities"],
        exact: false,
      });
    },
  });
};
