/**
 * useMyActivitiesList
 *
 * 내가 등록한 체험 목록 조회 훅
 */

import { useQuery } from "@tanstack/react-query";
import { getMyActivitiesList } from "../../lib/my-activities/api";
import type { MyActivitiesListQuery } from "../../lib/my-activities/types";
import { qk } from "../../lib/queryKeys";

export const useMyActivitiesList = (
  params: MyActivitiesListQuery,
  authToken: string | null | undefined,
) => {
  return useQuery({
    queryKey: qk.myActivities(params),
    queryFn: () => getMyActivitiesList(params, authToken!),
    enabled: !!authToken,
  });
};
