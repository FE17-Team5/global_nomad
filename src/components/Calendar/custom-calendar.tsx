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

import { useState } from 'react';
import Calendar from 'react-calendar';
import iconLeft from '../../assets/icon/icon_alt arrow_left.svg';
import iconRight from '../../assets/icon/icon_alt arrow_right.svg';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Schedule {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}

interface CustomCalendarProps {
  schedules: Schedule[];
  onDateSelect: (date: Date | null) => void;
  selectedDate: Date | null;
}

const CustomCalendar = ({ schedules, onDateSelect, selectedDate }: CustomCalendarProps) => {
  const [activeStartDate, setActiveStartDate] = useState(new Date());

  // schedules에서 예약 가능한 날짜만 추출
  const availableDates = schedules.map(s => new Date(s.date));

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
      availableDate => 
        date.toDateString() === availableDate.toDateString()
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
    <div className="w-full calendar-container">
      <style>{`
        .calendar-container .react-calendar {
          width: 100%;
          border: none;
          background: transparent;
          font-family: var(--font-sans);
          padding: 0;
        }
        
        .calendar-container .react-calendar__navigation {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: auto;
          margin-bottom: 0;
        }
        
        .calendar-container .react-calendar__navigation__label {
          font-size: 1rem;
          font-weight: 500;
          color: var(--color-gray-950);
          pointer-events: none;
          flex-grow: 0;
          order: -1;
          text-align: left;
          padding: 0;
        }
        
        .calendar-container .react-calendar__navigation__label:hover {
          background: transparent;
        }
        
        .calendar-container .react-calendar__navigation__arrow {
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          min-width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .calendar-container .react-calendar__navigation__arrow:hover {
          background: transparent;
        }
        
        .calendar-container .react-calendar__navigation__arrow:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        
        .calendar-container .react-calendar__navigation__prev-button {
          order: 2;
          margin-right: 24px;
        }
        
        .calendar-container .react-calendar__navigation__next-button {
          order: 3;
        }
        
        .calendar-container .react-calendar__month-view__weekdays {
          display: flex;
          gap: 4px;
          margin-top: 8px;
          margin-bottom: 4px;
        }
        
        .calendar-container .react-calendar__month-view__weekdays__weekday {
          font-family: var(--font-sans);
          font-size: 1rem;
          font-weight: 600;
          color: #49494C;
          width: 46px !important;
          min-width: 46px !important;
          max-width: 46px !important;
          height: 46px;
          flex-shrink: 0;
          flex-grow: 0;
          flex-basis: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          padding: 0 !important;
          margin: 0;
          text-decoration: none;
          text-transform: uppercase;
          box-sizing: border-box;
        }
        
        .calendar-container .react-calendar__month-view__weekdays__weekday abbr {
          text-decoration: none;
        }
        
        .calendar-container .react-calendar__month-view__days {
          display: grid !important;
          grid-template-columns: repeat(7, 46px);
          grid-template-rows: repeat(5, 46px);
          gap: 4px;
        }
        
        .calendar-container .react-calendar__tile {
          width: 46px;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          font-size: 1rem;
          font-weight: 500;
          color: #49494C !important;
          cursor: pointer;
          border-radius: 50%;
          transition: all 0.2s;
        }
        
        .calendar-container .react-calendar__tile:hover:not(:disabled) {
          background: var(--color-gray-50);
        }
        
        .calendar-container .react-calendar__tile:disabled {
          color: #B3B4BC !important;
          font-weight: 500;
          cursor: not-allowed;
          opacity: 1;
        }
        
        .calendar-container .react-calendar__month-view__days__day--neighboringMonth {
          color: #B3B4BC !important;
          font-weight: 500;
          visibility: visible;
        }
        
        .calendar-container .react-calendar__tile--now {
          background: #E5F3FF;
          color: #3D9EF2 !important;
          font-weight: 500;
        }
        
        .calendar-container .react-calendar__tile--now:disabled {
          background: #E5F3FF;
          color: #3D9EF2 !important;
          font-weight: 500;
          cursor: not-allowed;
        }
        
        .calendar-container .react-calendar__tile--active,
        .calendar-container .react-calendar__tile--active:hover {
          background: var(--color-primary-500) !important;
          color: #ffffff !important;
          font-weight: 700;
        }
        
        .calendar-container .react-calendar__year-view,
        .calendar-container .react-calendar__decade-view,
        .calendar-container .react-calendar__century-view {
          display: none;
        }
      `}</style>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileDisabled={tileDisabled}
        minDate={new Date()}
        locale="en-US"
        formatShortWeekday={(_locale, date) => 
          ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()]
        }
        formatMonthYear={(_locale, date) => 
          date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        }
        nextLabel={<img src={iconRight} alt="다음 달" className="w-6 h-6" />}
        prevLabel={<img src={iconLeft} alt="이전 달" className="w-6 h-6" />}
        next2Label={null}
        prev2Label={null}
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

