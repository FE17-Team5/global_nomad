import Calendar from "react-calendar";
import "./reservation-status-calendar.css";
import leftBtn from "../../../assets/icon/icon_alt arrow_left.svg";
import rightBtn from "../../../assets/icon/icon_alt arrow_right.svg";
import ReservationStatusModal from "../Modal/reservation-status-modal";
import { formatDateToString } from "../../../utils/date";
import CalendarReservationStatus from "../Status/calendar-reservation-status";
import { useReservationStatusCalendar } from "./useReservationStatusCalendar";

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
  const [
    currentTile,
    isOpen,
    data,
    handleDateClick,
    handleModalClose,
    handleActiveStartDateChange,
  ] = useReservationStatusCalendar(activityId);

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
