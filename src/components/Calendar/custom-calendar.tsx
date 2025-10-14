/**
 * CustomCalendar 컴포넌트
 *
 * React Calendar 기반 커스텀 캘린더
 * - 월/년도 표시 (영어/숫자)
 * - 좌우 화살표로 월 이동
 * - S M T W T F S 요일 표시
 * - 특정 날짜만 활성화 (schedules 기반)
 * - 선택된 날짜 강조
 */

import { useState } from "react";
import Calendar from "react-calendar";
import iconLeft from "../../assets/icon/icon_alt arrow_left.svg";
import iconRight from "../../assets/icon/icon_alt arrow_right.svg";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Schedule {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}

interface CustomCalendarProps {
  schedules: string[] | Schedule[];
  onDateSelect: (date: Date | null) => void;
  selectedDate: Date | null;
}

const CustomCalendar = ({
  schedules,
  onDateSelect,
  selectedDate,
}: CustomCalendarProps) => {
  const [activeStartDate, setActiveStartDate] = useState(new Date());

  // schedules에서 예약 가능한 날짜만 추출
  const availableDates = schedules.map(
    (s) => new Date(typeof s === "string" ? s : s.date),
  );

  // 특정 날짜만 활성화 (예약 가능한 날짜만 클릭 가능)
  const tileDisabled = ({ date }: { date: Date }) => {
    // 과거 날짜 비활성화
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) {
      return true;
    }

    // schedules에 없는 날짜는 비활성화
    return !availableDates.some(
      (availableDate) => date.toDateString() === availableDate.toDateString(),
    );
  };

  // 날짜 클릭 핸들러
  const handleDateChange = (value: Value) => {
    if (value instanceof Date) {
      onDateSelect(value);
    } else {
      onDateSelect(null);
    }
  };

  return (
    <div className="w-full base-calendar calendar-detail">
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileDisabled={tileDisabled}
        minDate={new Date()}
        locale="en-US"
        formatShortWeekday={(_locale, date) =>
          ["S", "M", "T", "W", "T", "F", "S"][date.getDay()]
        }
        formatMonthYear={(_locale, date) =>
          date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
        }
        nextLabel={<img src={iconRight} alt="다음 달" className="w-6 h-6" />}
        prevLabel={<img src={iconLeft} alt="이전 달" className="w-6 h-6" />}
        next2Label={null}
        prev2Label={null}
        showFixedNumberOfWeeks={true}
        showNeighboringMonth={true}
        activeStartDate={activeStartDate}
        onActiveStartDateChange={({ activeStartDate }) => {
          if (activeStartDate) {
            setActiveStartDate(activeStartDate);
          }
        }}
      />
    </div>
  );
};

export default CustomCalendar;
