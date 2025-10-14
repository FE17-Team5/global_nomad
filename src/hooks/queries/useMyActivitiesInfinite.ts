/**
 * useMyActivitiesInfinite
 *
 * 내가 등록한 체험 목록 무한스크롤 조회 훅
 * - 최신순 정렬
 * - 무한스크롤 (IntersectionObserver)
 */

import { useInfiniteQuery } from "@tanstack/react-query";
import { getMyActivitiesList } from "../../lib/my-activities/api";
import { qk } from "../../lib/queryKeys";

export const useMyActivitiesInfinite = (
  authToken: string | null | undefined,
  size: number = 10,
) => {
  return useInfiniteQuery({
    queryKey: qk.myActivitiesInfinite(size),
    queryFn: ({ pageParam }) =>
      getMyActivitiesList({ cursorId: pageParam, size }, authToken!),
    getNextPageParam: (lastPage) => {
      // 다음 페이지가 있으면 cursorId 반환, 없으면 undefined
      return lastPage.activities.length > 0 ? lastPage.cursorId : undefined;
    },
    initialPageParam: undefined as number | undefined,
    enabled: !!authToken,
  });
};
