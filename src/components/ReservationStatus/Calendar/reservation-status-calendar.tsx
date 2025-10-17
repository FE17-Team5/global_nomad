import Calendar from "react-calendar";
import "./reservation-status-calendar.css";
import leftBtn from "../../../assets/icon/icon_alt arrow_left.svg";
import rightBtn from "../../../assets/icon/icon_alt arrow_right.svg";
import { useState } from "react";
import type { Value } from "react-calendar/src/shared/types.js";
import ReservationStatusModal from "../Modal/reservation-status-modal";
import { useReservationDashboard } from "../../../hooks/queries";
import { formatDateToString } from "../../../utils/date";
import CalendarReservationStatus from "../Status/calendar-reservation-status";

type FormatType = (locale?: string, date?: Date) => string;

const formatWeekday: FormatType = (_locale, date) => {
  if (!date) return "";

  const dayIndex = date!.getDay();
  const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

  return weekdays[dayIndex];
};

const formatDay: FormatType = (_locale, date) => {
  if (!date) return "";

  return date!.getDate().toString();
};

const ReservationStatusCalendar = ({ activityId }: { activityId: number }) => {
  const accessToken = localStorage.getItem("accessToken");
  const [currentTile, setCurrentTile] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState({
    year: String(new Date().getFullYear()),
    month: String(new Date().getMonth() + 1).padStart(2, "0"),
  });

  const { data } = useReservationDashboard(
    activityId,
    {
      year: date.year,
      month: date.month,
    },
    accessToken
  );

  const handleDateClick = (
    value: Value,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (value instanceof Date && event.currentTarget) {
      setCurrentTile(value);
      handleModalOpen();
    }
  };

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handleActiveStartDateChange = ({
    activeStartDate,
  }: {
    activeStartDate: Date | null;
  }) => {
    if (activeStartDate instanceof Date) {
      const year = String(activeStartDate.getFullYear());
      const month = String(activeStartDate.getMonth() + 1).padStart(2, "0");

      setDate({
        year,
        month,
      });
    }
  };

  return (
    <div className="calendar_container">
      <Calendar
        value={currentTile}
        onChange={handleDateClick}
        calendarType="gregory"
        locale="ko-KR"
        prevLabel={<img src={leftBtn} alt="왼쪽버튼" />}
        nextLabel={<img src={rightBtn} alt="오른쪽버튼" />}
        next2Label={null}
        prev2Label={null}
        formatShortWeekday={formatWeekday}
        formatDay={formatDay}
        onActiveStartDateChange={handleActiveStartDateChange}
        tileDisabled={({ date, view }) => {
          if (view !== "month") return false;
          const dateString = formatDateToString(date);
          const dayData = data?.find((item) => item.date === dateString);
          if (dayData) {
            return false;
          }
          return true;
        }}
        tileContent={({ date, view }) => {
          if (view === "month") {
            const dateString = formatDateToString(date);
            const dayData = data?.find((item) => item.date === dateString);
            if (dayData) {
              return <CalendarReservationStatus data={dayData} />;
            }
          }
        }}
        tileClassName={({ date, view }) => {
          if (view === "month") {
            const dateString = formatDateToString(date);
            const dayData = data?.find((item) => item.date === dateString);
            if (dayData) {
              return "has-dot";
            }
            return null;
          }
        }}
      />
      <ReservationStatusModal
        date={currentTile}
        activityId={activityId}
        isOpen={isOpen}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default ReservationStatusCalendar;
