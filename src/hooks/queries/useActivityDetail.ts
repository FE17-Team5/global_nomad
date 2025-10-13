/**
 * useActivityDetail
 *
 * 체험 상세 정보 조회 훅
 * id가 없으면 자동으로 비활성화됨
 */

import { useQuery } from "@tanstack/react-query";
import { getActivityDetail } from "../../lib/activities/api";
import { qk } from "../../lib/queryKeys";

export const useActivityDetail = (activityId: number | null | undefined) => {
  return useQuery({
    queryKey: qk.activityDetail(activityId || 0),
    queryFn: () => getActivityDetail(activityId!),
    enabled: !!activityId, // activityId가 있을 때만 실행
  });
};
