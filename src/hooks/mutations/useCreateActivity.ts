/**
 * useCreateActivity
 *
 * 체험 등록 mutation 훅
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createActivity } from "../../lib/activities/api";
import type { CreateActivityBody } from "../../lib/activities/types";

export const useCreateActivity = (authToken: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateActivityBody) => createActivity(body, authToken),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["activities"],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ["my-activities"],
        exact: false,
      });
    },
  });
};
