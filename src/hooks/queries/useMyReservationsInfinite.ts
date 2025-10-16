import { useInfiniteQuery } from "@tanstack/react-query";
import { qk } from "../../lib/queryKeys";
import { getMyReservationsList } from "../../lib/my-reservations/api";
import type { components } from "../../types/api-types";

export const useMyReservationsInfinite = (
  authToken: string | null | undefined,
  size: number = 10,
  filters: components["schemas"]["ReservationStatus"] | undefined
) => {
  return useInfiniteQuery({
    queryKey: qk.myReservationsInfinite(size, filters),
    queryFn: ({ pageParam }) =>
      getMyReservationsList(
        { cursorId: pageParam, size, status: filters },
        authToken!
      ),
    getNextPageParam: (lastPage) => {
      // 다음 페이지가 있으면 cursorId 반환, 없으면 undefined
      return lastPage.reservations.length > 0 ? lastPage.cursorId : undefined;
    },
    initialPageParam: undefined as number | undefined,
    enabled: !!authToken,
  });
};
