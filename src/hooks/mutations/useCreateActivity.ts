/**
 * useCreateActivity
 *
 * 체험 등록 mutation 훅
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createActivity } from "../../lib/activities/api";
import type { CreateActivityBody } from "../../lib/activities/types";
import { qk } from "../../lib/queryKeys";

export const useCreateActivity = (authToken: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateActivityBody) => createActivity(body, authToken),
    onSuccess: () => {
      // 체험 목록 갱신
      queryClient.invalidateQueries({ queryKey: qk.activities() });
      queryClient.invalidateQueries({ queryKey: qk.myActivities() });
    },
  });
};
