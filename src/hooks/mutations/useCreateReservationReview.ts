/**
 * useCreateReservationReview
 *
 * 예약 리뷰 작성 mutation 훅
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReservationReview } from "../../lib/my-reservations/api";
import type { CreateReservationReviewBody } from "../../lib/my-reservations/types";
import { qk } from "../../lib/queryKeys";

export const useCreateReservationReview = (
  reservationId: number,
  activityId: number,
  authToken: string,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateReservationReviewBody) =>
      createReservationReview(reservationId, body, authToken),
    onSuccess: () => {
      // 내 예약 목록 갱신 (reviewSubmitted 상태 변경)
      queryClient.invalidateQueries({ queryKey: qk.myReservations() });
      // 해당 체험의 리뷰 목록 갱신
      queryClient.invalidateQueries({
        queryKey: [...qk.activityDetail(activityId), "reviews"],
      });
      // 체험 상세 정보 갱신 (평점 변경)
      queryClient.invalidateQueries({
        queryKey: qk.activityDetail(activityId),
      });
    },
  });
};
