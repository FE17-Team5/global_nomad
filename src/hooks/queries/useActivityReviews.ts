/**
 * useActivityReviews
 *
 * 체험 리뷰 목록 조회 훅
 * 페이지네이션 파라미터 지원
 */

import { useQuery } from "@tanstack/react-query";
import { getActivityReviews } from "../../lib/activities/api";
import type { ActivityReviewsQuery } from "../../lib/activities/types";
import { qk } from "../../lib/queryKeys";

export const useActivityReviews = (
  activityId: number | null | undefined,
  params?: ActivityReviewsQuery,
) => {
  return useQuery({
    queryKey: [...qk.activityDetail(activityId || 0), "reviews", params],
    queryFn: () => getActivityReviews(activityId!, params),
    enabled: !!activityId,
  });
};
