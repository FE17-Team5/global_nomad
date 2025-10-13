/**
 * useCancelMyReservation
 *
 * 내 예약 취소 mutation 훅
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelMyReservation } from "../../lib/my-reservations/api";
import { qk } from "../../lib/queryKeys";

export const useCancelMyReservation = (authToken: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reservationId: number) =>
      cancelMyReservation(reservationId, { status: "canceled" }, authToken),
    onSuccess: () => {
      // 내 예약 목록 갱신
      queryClient.invalidateQueries({ queryKey: qk.myReservations() });
    },
  });
};
