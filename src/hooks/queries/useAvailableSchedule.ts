/**
 * useAvailableSchedule
 *
 * 체험 예약 가능일 조회 훅
 * 특정 년/월의 예약 가능한 날짜와 시간 조회
 */

import { useQuery } from "@tanstack/react-query";
import { getAvailableSchedule } from "../../lib/activities/api";
import type { AvailableScheduleQuery } from "../../lib/activities/types";
import { qk } from "../../lib/queryKeys";

export const useAvailableSchedule = (
  activityId: number | null | undefined,
  params: AvailableScheduleQuery,
) => {
  return useQuery({
    queryKey: [...qk.activityDetail(activityId || 0), "schedule", params],
    queryFn: () => getAvailableSchedule(activityId!, params),
    enabled: !!activityId,
  });
};
