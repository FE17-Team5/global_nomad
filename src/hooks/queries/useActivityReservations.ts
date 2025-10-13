/**
 * useActivityReservations
 *
 * 시간대별 예약 내역 조회 훅
 * 특정 체험의 스케줄별 예약 목록
 */

import { useQuery } from "@tanstack/react-query";
import { getActivityReservations } from "../../lib/my-activities/api";
import type { ActivityReservationsQuery } from "../../lib/my-activities/types";
import { qk } from "../../lib/queryKeys";

export const useActivityReservations = (
  activityId: number | null | undefined,
  params: ActivityReservationsQuery,
  authToken: string | null | undefined,
) => {
  return useQuery({
    queryKey: [...qk.myActivities(), activityId, "reservations", params],
    queryFn: () => getActivityReservations(activityId!, params, authToken!),
    enabled: !!activityId && !!authToken && !!params.scheduleId,
  });
};
