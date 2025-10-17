/**
 * useUpdateReservationStatus
 *
 * 예약 상태 변경 mutation 훅
 * (승인/거절)
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateReservationStatus } from "../../lib/my-activities/api";
import type { UpdateReservationStatusBody } from "../../lib/my-activities/types";
import { qk } from "../../lib/queryKeys";

export const useUpdateReservationStatus = (
  activityId: number,
  authToken: string
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      reservationId,
      body,
    }: {
      reservationId: number;
      body: UpdateReservationStatusBody;
    }) => updateReservationStatus(activityId, reservationId, body, authToken),
    onSuccess: () => {
      // 예약 목록 갱신
      queryClient.invalidateQueries({
        queryKey: [...qk.myActivities(), activityId, "reservations"],
      });
      // 대시보드 갱신
      queryClient.invalidateQueries({
        queryKey: [...qk.myActivities(), activityId, "reservation-dashboard"],
      });
      // 예약 후 스케줄 목록 경신
      queryClient.invalidateQueries({
        queryKey: [...qk.myActivities(), activityId, "reserved-schedule"],
      });
    },
  });
};
