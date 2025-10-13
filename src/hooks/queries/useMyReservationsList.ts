/**
 * useMyReservationsList
 *
 * 내 예약 목록 조회 훅
 * 필터링, 페이지네이션 파라미터 지원
 */

import { useQuery } from "@tanstack/react-query";
import { getMyReservationsList } from "../../lib/my-reservations/api";
import type { MyReservationsListQuery } from "../../lib/my-reservations/types";
import { qk } from "../../lib/queryKeys";

export const useMyReservationsList = (
  params: MyReservationsListQuery,
  authToken: string | null | undefined,
) => {
  return useQuery({
    queryKey: qk.myReservations(params),
    queryFn: () => getMyReservationsList(params, authToken!),
    enabled: !!authToken,
  });
};
