import { useState } from "react";
import type { components } from "../../types/api-types";
import { useMyReservationsInfinite } from "../../hooks/queries/useMyReservationsInfinite";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import type { MyReservation } from "../../lib/my-reservations/types";

type ReservationListType = () => [
  reservations: MyReservation[],
  isLoading: boolean,
  error: Error | null,
  observerTarget: React.RefObject<HTMLDivElement | null>,
  selectedBadge: components["schemas"]["ReservationStatus"] | undefined,
  handleBadgeClick: (
    status: components["schemas"]["ReservationStatus"] | undefined
  ) => void
];

export const useReservationList: ReservationListType = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [selectedBadge, setSelectedBadge] = useState<
    components["schemas"]["ReservationStatus"] | undefined
  >(undefined);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useMyReservationsInfinite(accessToken, 5, selectedBadge);

  const observerTarget = useInfiniteScroll(
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  );

  const reservations = data?.pages.flatMap((page) => page.reservations) || [];

  const handleBadgeClick = (
    status: components["schemas"]["ReservationStatus"] | undefined
  ) => {
    if (selectedBadge === status) {
      setSelectedBadge(undefined);
    } else {
      setSelectedBadge(status!);
    }
  };

  return [
    reservations,
    isLoading,
    error,
    observerTarget,
    selectedBadge,
    handleBadgeClick,
  ];
};
