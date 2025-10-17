import { useState } from "react";
import { useMyActivitiesList } from "../../hooks/queries";
import ReservationStatusCalendar from "./Calendar/reservation-status-calendar";
import MyReservationDropdown from "./Dropdown/my-reservation-dropdown";
import EmptyData from "./EmptyData/empty-data";

const ReservationStatus = () => {
  const accessToken = localStorage.getItem("accessToken");
  const { data } = useMyActivitiesList({}, accessToken);
  const [activityId, setActivityId] = useState<number>(-1);

  const handleSchedule = (id: number) => {
    setActivityId(id);
  };

  return data?.totalCount! > 0 ? (
    <div className="flex flex-col gap-[30px]">
      <MyReservationDropdown
        reservations={data?.activities}
        handleSchedule={handleSchedule}
      />
      {activityId !== -1 && (
        <>
          <div className="hidden mobile:flex mobile:flex mobile:gap-3 mobile:justify-end">
            <div className="flex items-center gap-2 ty-11_B">
              예약 : <div className="w-[20px] h-[5px] bg-primary-100"></div>
            </div>
            <div className="flex items-center gap-2 ty-11_B">
              승인 : <div className="w-[20px] h-[5px] bg-amber-100"></div>
            </div>
            <div className="flex items-center gap-2 ty-11_B">
              완료 : <div className="w-[20px] h-[5px] bg-gray-100"></div>
            </div>
          </div>
          <ReservationStatusCalendar activityId={activityId} />
        </>
      )}
    </div>
  ) : (
    <EmptyData />
  );
};

export default ReservationStatus;
