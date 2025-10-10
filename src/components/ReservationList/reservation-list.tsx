import { useState } from "react";
import EmptyData from "./EmptyData/empty-data";
import FilterBadgeList from "./FilterBadge/filter-badge-list";
import { reservationMockData } from "./mock-data";
import type { components } from "../../types/api-types";
import ReservationCardList from "./Card/reservation-card-list";

const ReservationList = () => {
  const [reservations, setReservations] = useState(reservationMockData);
  const [selectedBadge, setSelectedBadge] = useState<
    components["schemas"]["ReservationStatus"] | null
  >(null);

  const handleBadgeClick = (
    status: components["schemas"]["ReservationStatus"] | null
  ) => {
    if (selectedBadge === status) {
      setSelectedBadge(null);
      setReservations(reservationMockData);
    } else {
      setSelectedBadge(status);
      setReservations(
        reservationMockData.filter(
          (reservation) => reservation.status === status
        )
      );
    }
  };

  return (
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
  );
};

export default ReservationList;
