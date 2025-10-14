import { useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import arrowDownIcon from "../../../assets/icon/icon_alt arrow_down.svg";
import iconLeft from "../../../assets/icon/icon_alt arrow_left.svg";
import iconRight from "../../../assets/icon/icon_alt arrow_right.svg";
import calendarIcon from "../../../assets/icon/icon_calendar.svg";
import plusIcon from "../../../assets/icon/icon_plus.svg";
import { formatDateShort } from "../../../utils/date";
import { TIME_SLOTS } from "./utils";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface ScheduleInputProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
  startTime: string;
  onStartTimeChange: (time: string) => void;
  endTime: string;
  onEndTimeChange: (time: string) => void;
  onAdd: () => void;
  isAddEnabled: boolean;
}

const ScheduleInput = ({
  selectedDate,
  onDateChange,
  startTime,
  onStartTimeChange,
  endTime,
  onEndTimeChange,
  onAdd,
  isAddEnabled,
}: ScheduleInputProps) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isStartTimeOpen, setIsStartTimeOpen] = useState(false);
  const [isEndTimeOpen, setIsEndTimeOpen] = useState(false);

  const calendarRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<HTMLDivElement>(null);
  const endTimeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsCalendarOpen(false);
      }
      if (
        startTimeRef.current &&
        !startTimeRef.current.contains(event.target as Node)
      ) {
        setIsStartTimeOpen(false);
      }
      if (
        endTimeRef.current &&
        !endTimeRef.current.contains(event.target as Node)
      ) {
        setIsEndTimeOpen(false);
      }
    };

    if (isCalendarOpen || isStartTimeOpen || isEndTimeOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCalendarOpen, isStartTimeOpen, isEndTimeOpen]);

  const handleDateChange = (value: Value) => {
    if (value instanceof Date) {
      onDateChange(value);
      setIsCalendarOpen(false);
    }
  };

  return (
    <div className="mt-[18px] flex items-end sm-mobile:flex-col sm-mobile:items-stretch">
      {/* 1. 날짜 */}
      <div
        className="flex flex-col w-[360px] sm-mobile:w-full relative"
        ref={calendarRef}
      >
        <div className="ty-16_B" style={{ color: "#1F1F22" }}>
          날짜
        </div>
        <div className="relative">
          <input
            type="text"
            value={selectedDate ? formatDateShort(selectedDate) : ""}
            readOnly
            placeholder="yy/mm/dd"
            className="w-full h-[54px] mt-[10px] px-5 rounded-md ty-16_M placeholder:text-[#9FA0A7] cursor-pointer"
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            style={{
              color: "#1F1F22",
              border: "1px solid #E0E0E5",
              boxShadow: "0px 2px 6px 0px #00000005",
            }}
          />

          {/* 캘린더 아이콘 */}
          <div
            className="absolute right-4 top-1/2 -translate-y-1/2 mt-[5px]"
            style={{ pointerEvents: "none" }}
          >
            <img src={calendarIcon} alt="" className="w-6 h-6" />
          </div>

          {/* 캘린더 드롭다운 */}
          {isCalendarOpen && (
            <div
              className="absolute top-full right-0 mt-2 bg-white rounded-md p-6 z-10 base-calendar calendar-add"
              style={{
                border: "1px solid #E0E0E5",
                boxShadow: "0px 2px 6px 0px #00000005",
              }}
            >
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                minDate={new Date()}
                locale="en-US"
                formatShortWeekday={(_locale, date) =>
                  ["S", "M", "T", "W", "T", "F", "S"][date.getDay()]
                }
                formatMonthYear={(_locale, date) =>
                  date.toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })
                }
                nextLabel={
                  <img src={iconRight} alt="다음 달" className="w-6 h-6" />
                }
                prevLabel={
                  <img src={iconLeft} alt="이전 달" className="w-6 h-6" />
                }
                next2Label={null}
                prev2Label={null}
                showFixedNumberOfWeeks={true}
                showNeighboringMonth={true}
              />
            </div>
          )}
        </div>
      </div>

      {/* 시간 영역 (Desktop: 한 줄, Mobile: 날짜 아래) */}
      <div className="flex items-end sm-mobile:items-center ml-[14px] sm-mobile:ml-0 sm-mobile:mt-[10px]">
        {/* 2. 시작 시간 */}
        <div
          className="flex flex-col w-[122px] sm-mobile:flex-1 relative"
          ref={startTimeRef}
        >
          <div
            className="ty-16_B sm-mobile:hidden"
            style={{ color: "#1F1F22" }}
          >
            시작 시간
          </div>
          <button
            type="button"
            onClick={() => setIsStartTimeOpen(!isStartTimeOpen)}
            className="w-full h-[54px] mt-[10px] sm-mobile:mt-0 px-5 rounded-md ty-16_M text-left flex items-center justify-between"
            style={{
              color: startTime ? "#1F1F22" : "#9FA0A7",
              border: "1px solid #E0E0E5",
              boxShadow: "0px 2px 6px 0px #00000005",
            }}
          >
            <span>{startTime || "0:00"}</span>
            <img
              src={arrowDownIcon}
              alt=""
              className="w-6 h-6"
              style={{
                transform: isStartTimeOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s",
              }}
            />
          </button>

          {/* 시작 시간 드롭다운 */}
          {isStartTimeOpen && (
            <div
              className="absolute top-full left-0 right-0 mt-2 rounded-md bg-white z-10"
              style={{
                height: "280px",
                padding: "12px",
                border: "1px solid #E0E0E5",
                boxShadow: "0px 2px 6px 0px #00000005",
                overflowY: "auto",
              }}
            >
              <div className="flex flex-col gap-1">
                {TIME_SLOTS.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => {
                      onStartTimeChange(time);
                      setIsStartTimeOpen(false);
                    }}
                    className="w-full h-10 px-4 rounded ty-14_M text-left transition-colors hover:bg-gray-50"
                    style={{ color: "#323236" }}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 3. Divider */}
        <div
          className="w-2 h-[2px] ml-[9px] mr-[9px] mb-[26px] sm-mobile:mb-0 sm-mobile:self-center flex-shrink-0"
          style={{ backgroundColor: "#49494C" }}
        />

        {/* 4. 종료 시간 */}
        <div
          className="flex flex-col w-[122px] sm-mobile:flex-1 relative"
          ref={endTimeRef}
        >
          <div
            className="ty-16_B sm-mobile:hidden"
            style={{ color: "#1F1F22" }}
          >
            종료 시간
          </div>
          <button
            type="button"
            onClick={() => setIsEndTimeOpen(!isEndTimeOpen)}
            className="w-full h-[54px] mt-[10px] sm-mobile:mt-0 px-5 rounded-md ty-16_M text-left flex items-center justify-between"
            style={{
              color: endTime ? "#1F1F22" : "#9FA0A7",
              border: "1px solid #E0E0E5",
              boxShadow: "0px 2px 6px 0px #00000005",
            }}
          >
            <span>{endTime || "0:00"}</span>
            <img
              src={arrowDownIcon}
              alt=""
              className="w-6 h-6"
              style={{
                transform: isEndTimeOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s",
              }}
            />
          </button>

          {/* 종료 시간 드롭다운 */}
          {isEndTimeOpen && (
            <div
              className="absolute top-full left-0 right-0 mt-2 rounded-md bg-white z-10"
              style={{
                height: "280px",
                padding: "12px",
                border: "1px solid #E0E0E5",
                boxShadow: "0px 2px 6px 0px #00000005",
                overflowY: "auto",
              }}
            >
              <div className="flex flex-col gap-1">
                {TIME_SLOTS.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => {
                      onEndTimeChange(time);
                      setIsEndTimeOpen(false);
                    }}
                    className="w-full h-10 px-4 rounded ty-14_M text-left transition-colors hover:bg-gray-50"
                    style={{ color: "#323236" }}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 5. 추가 버튼 */}
        <button
          type="button"
          onClick={onAdd}
          disabled={!isAddEnabled}
          className="w-[42px] h-[42px] sm-mobile:w-7 sm-mobile:h-7 ml-[14px] mb-[6px] sm-mobile:mb-0 sm-mobile:self-center rounded-full flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 flex-shrink-0"
          style={{ backgroundColor: "#3D9EF2" }}
          aria-label="시간대 추가"
        >
          <img
            src={plusIcon}
            alt=""
            className="w-6 h-6 sm-mobile:w-[18px] sm-mobile:h-[18px]"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </button>
      </div>
    </div>
  );
};

export default ScheduleInput;
