import type { components } from "../../../types/api-types";

const CalendarReservationStatus = ({
  data,
}: {
  data: components["schemas"]["FindReservationsByMonthResponseDto"];
}) => {
  return (
    <div className="flex flex-col gap-1">
      {data.reservations.pending !== 0 && (
        <div className="w-full px-2 py-0.5 bg-primary-100 text-primary-500 rounded-[4px] ty-14_M tablet:px-1 tablet:ty-11_M mobile:h-[8px]">
          <span className="mobile:hidden">
            예약 {data.reservations.pending}
          </span>
        </div>
      )}
      {data.reservations.confirmed !== 0 && (
        <div className="w-full px-2 py-0.5 bg-amber-100 text-amber-500 rounded-[4px] ty-14_M tablet:px-1 tablet:ty-11_M mobile:h-[8px]">
          <span className="mobile:hidden">
            승인 {data.reservations.confirmed}
          </span>
        </div>
      )}
      {data.reservations.completed !== 0 && (
        <div className="w-full px-2 py-0.5 bg-gray-100 text-gray-500 rounded-[4px] ty-14_M tablet:px-1 tablet:ty-11_M mobile:h-[8px]">
          <span className="mobile:hidden">
            완료 {data.reservations.completed}
          </span>
        </div>
      )}
    </div>
  );
};

export default CalendarReservationStatus;
