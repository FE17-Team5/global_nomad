/**
 * useCreateReservation
 *
 * 체험 예약 신청 mutation 훅
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReservation } from "../../lib/activities/api";
import type { CreateReservationBody } from "../../lib/activities/types";
import { qk } from "../../lib/queryKeys";

export const useCreateReservation = (activityId: number, authToken: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateReservationBody) =>
      createReservation(activityId, body, authToken),
    onSuccess: () => {
      // 예약 목록 갱신
      queryClient.invalidateQueries({ queryKey: qk.myReservations() });
      // 예약 가능 일정 갱신
      queryClient.invalidateQueries({
        queryKey: [...qk.activityDetail(activityId), "schedule"],
      });
    },
  });
};
