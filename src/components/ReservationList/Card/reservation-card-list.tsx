import type { components } from "../../../types/api-types";
import ReservationCard from "./reservation-card";

const ReservationCardList = ({
  reservations,
}: {
  reservations: components["schemas"]["ReservationWithActivityResponseDto"][];
}) => {
  return (
    <div className="flex flex-col gap-6">
      {reservations.map((reservation, index) => (
        <div
          key={reservation.id}
          className="tablet:flex tablet:flex-col tablet:gap-[30px]"
        >
          <ReservationCard key={reservation.id} {...reservation} />
          <hr
            className={`hidden ${
              reservations.length - 1 === index && "hidden tablet:hidden"
            } border border-gray-50 tablet:block`}
          />
        </div>
      ))}
    </div>
  );
};

export default ReservationCardList;
