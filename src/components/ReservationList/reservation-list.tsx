import { useState } from "react";
import EmptyData from "./EmptyData/empty-data";
import FilterBadgeList from "./FilterBadge/filter-badge-list";
import type { components } from "../../types/api-types";
import ReservationCardList from "./Card/reservation-card-list";
import { useMyReservationsInfinite } from "../../hooks/queries/useMyReservationsInfinite";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";

const ReservationList = () => {
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="ty-16_M text-gray-400">로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="ty-16_M text-red-500">
          데이터를 불러오는데 실패했습니다.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        <FilterBadgeList
          selectedBadge={selectedBadge}
          onClick={handleBadgeClick}
        />
        {reservations.length > 0 ? (
          <ReservationCardList reservations={reservations} />
        ) : (
          <EmptyData selectedBadge={selectedBadge} />
        )}
      </div>
      <div ref={observerTarget} className="h-10 w-full" />
    </>
  );
};

export default ReservationList;
