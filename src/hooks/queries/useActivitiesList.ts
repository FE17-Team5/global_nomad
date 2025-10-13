/**
 * useActivitiesList
 *
 * 체험 목록 조회 훅
 * 필터링, 정렬, 페이지네이션 파라미터 지원
 */

import { useQuery } from "@tanstack/react-query";
import { getActivitiesList } from "../../lib/activities/api";
import type { ActivitiesListQuery } from "../../lib/activities/types";
import { qk } from "../../lib/queryKeys";

export const useActivitiesList = (params: ActivitiesListQuery) => {
  return useQuery({
    queryKey: qk.activities(params),
    queryFn: () => getActivitiesList(params),
  });
};
