import Calendar from "react-calendar";
import "./reservation-status-calendar.css";
import leftBtn from "../../../assets/icon/icon_alt arrow_left.svg";
import rightBtn from "../../../assets/icon/icon_alt arrow_right.svg";
import { useState } from "react";
import type { Value } from "react-calendar/src/shared/types.js";
import ReservationStatusModal from "../Modal/reservation-status-modal";

type FormatType = (locale?: string, date?: Date) => string;

const formatWeekday: FormatType = (locale, date) => {
  const dayIndex = date!.getDay();
  const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

  return weekdays[dayIndex];
};

const formatDay: FormatType = (locale, date) => {
  return date!.getDate().toString();
};

const ReservationStatusCalendar = () => {
  const [currentTile, setCurrentTile] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const handleDateClick = (
    value: Value,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (value instanceof Date) {
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
      />
      <ReservationStatusModal
        date={currentTile}
        isOpen={isOpen}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default ReservationStatusCalendar;
