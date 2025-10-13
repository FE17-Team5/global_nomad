/**
 * useReservedSchedule
 *
 * 날짜별 예약 현황 조회 훅
 * 특정 날짜의 시간대별 예약 카운트
 */

import { useQuery } from "@tanstack/react-query";
import { getReservedSchedule } from "../../lib/my-activities/api";
import type { ReservedScheduleQuery } from "../../lib/my-activities/types";
import { qk } from "../../lib/queryKeys";

export const useReservedSchedule = (
  activityId: number | null | undefined,
  params: ReservedScheduleQuery,
  authToken: string | null | undefined,
) => {
  return useQuery({
    queryKey: [...qk.myActivities(), activityId, "reserved-schedule", params],
    queryFn: () => getReservedSchedule(activityId!, params, authToken!),
    enabled: !!activityId && !!authToken && !!params.date,
  });
};
