/**
 * useReservationDashboard
 *
 * 월별 예약 현황 조회 훅
 * 특정 체험의 월별 예약 통계 데이터
 */

import { useQuery } from "@tanstack/react-query";
import { getReservationDashboard } from "../../lib/my-activities/api";
import type { ReservationDashboardQuery } from "../../lib/my-activities/types";
import { qk } from "../../lib/queryKeys";

export const useReservationDashboard = (
  activityId: number | null | undefined,
  params: ReservationDashboardQuery,
  authToken: string | null | undefined,
) => {
  return useQuery({
    queryKey: [
      ...qk.myActivities(),
      activityId,
      "reservation-dashboard",
      params,
    ],
    queryFn: () => getReservationDashboard(activityId!, params, authToken!),
    enabled: !!activityId && !!authToken,
  });
};
