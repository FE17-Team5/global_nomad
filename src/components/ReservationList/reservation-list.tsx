import EmptyData from "./EmptyData/empty-data";
import FilterBadgeList from "./FilterBadge/filter-badge-list";
import ReservationCardList from "./Card/reservation-card-list";
import { useReservationList } from "./useReservationList";
import SkeletonUi from "./skeleton-ui";

const ReservationList = () => {
  const [
    reservations,
    isLoading,
    error,
    observerTarget,
    selectedBadge,
    handleBadgeClick,
  ] = useReservationList();

  if (isLoading) {
    return <SkeletonUi />;
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
