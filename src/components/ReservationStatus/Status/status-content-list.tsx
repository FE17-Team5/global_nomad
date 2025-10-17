import type { ActivityReservationsResponse } from "../../../lib/my-activities/types";
import StatusContent from "./status-content";

const StatusContentList = ({
  reservations,
  handleTitle,
}: {
  reservations: ActivityReservationsResponse["reservations"];
  handleTitle: (title: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-3 tablet:grow mobile:grow-0">
      {reservations.map((reservation, index) => (
        <StatusContent
          key={reservation.id}
          reservation={reservation}
          index={index}
          handleTitle={handleTitle}
        />
      ))}
    </div>
  );
};

export default StatusContentList;
