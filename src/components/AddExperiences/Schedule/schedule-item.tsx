import { useEffect, useRef, useState } from "react";
import arrowDownIcon from "../../../assets/icon/icon_alt arrow_down.svg";
import minusIcon from "../../../assets/icon/icon_minus.svg";
import type { Schedule } from "./types";
import { TIME_SLOTS } from "./utils";

interface ScheduleItemProps {
  schedule: Schedule;
  onRemove: (id: number) => void;
  onUpdateTime: (
    id: number,
    field: "startTime" | "endTime",
    value: string,
  ) => void;
}

const ScheduleItem = ({
  schedule,
  onRemove,
  onUpdateTime,
}: ScheduleItemProps) => {
  const [isStartTimeOpen, setIsStartTimeOpen] = useState(false);
  const [isEndTimeOpen, setIsEndTimeOpen] = useState(false);
  const startTimeRef = useRef<HTMLDivElement>(null);
  const endTimeRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
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

    if (isStartTimeOpen || isEndTimeOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isStartTimeOpen, isEndTimeOpen]);

  return (
    <div className="flex items-center sm-mobile:flex-col sm-mobile:items-stretch">
      {/* 날짜 (고정) */}
      <div className="w-[360px] sm-mobile:w-full relative">
        <input
          type="text"
          value={schedule.date}
          readOnly
          className="w-full h-[54px] px-5 rounded-md ty-16_M"
          style={{
            color: "#1F1F22",
            border: "1px solid #E0E0E5",
            boxShadow: "0px 2px 6px 0px #00000005",
            backgroundColor: "#F9F9F9",
            cursor: "not-allowed",
          }}
        />
      </div>

      {/* 시간 영역 (Desktop: 한 줄, Mobile: 날짜 아래) */}
      <div className="flex items-center ml-[14px] sm-mobile:ml-0 sm-mobile:mt-[10px]">
        {/* 시작 시간 (수정 가능) */}
        <div className="w-[122px] sm-mobile:flex-1 relative" ref={startTimeRef}>
          <button
            type="button"
            onClick={() => setIsStartTimeOpen(!isStartTimeOpen)}
            className="w-full h-[54px] px-5 rounded-md ty-16_M text-left flex items-center justify-between"
            style={{
              color: "#1F1F22",
              border: "1px solid #E0E0E5",
              boxShadow: "0px 2px 6px 0px #00000005",
            }}
          >
            <span>{schedule.startTime}</span>
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
                      onUpdateTime(schedule.id, "startTime", time);
                      setIsStartTimeOpen(false);
                    }}
                    className="w-full h-12 px-4 rounded ty-16_M text-left transition-colors"
                    style={{
                      color: "#323236",
                      backgroundColor:
                        schedule.startTime === time ? "#E5F3FF" : "transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#E5F3FF";
                    }}
                    onMouseLeave={(e) => {
                      if (schedule.startTime !== time) {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }
                    }}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div
          className="w-2 h-[2px] ml-[9px] mr-[9px] self-center flex-shrink-0"
          style={{ backgroundColor: "#49494C" }}
        />

        {/* 종료 시간 (수정 가능) */}
        <div className="w-[122px] sm-mobile:flex-1 relative" ref={endTimeRef}>
          <button
            type="button"
            onClick={() => setIsEndTimeOpen(!isEndTimeOpen)}
            className="w-full h-[54px] px-5 rounded-md ty-16_M text-left flex items-center justify-between"
            style={{
              color: "#1F1F22",
              border: "1px solid #E0E0E5",
              boxShadow: "0px 2px 6px 0px #00000005",
            }}
          >
            <span>{schedule.endTime}</span>
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
                      onUpdateTime(schedule.id, "endTime", time);
                      setIsEndTimeOpen(false);
                    }}
                    className="w-full h-12 px-4 rounded ty-16_M text-left transition-colors"
                    style={{
                      color: "#323236",
                      backgroundColor:
                        schedule.endTime === time ? "#E5F3FF" : "transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#E5F3FF";
                    }}
                    onMouseLeave={(e) => {
                      if (schedule.endTime !== time) {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }
                    }}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 삭제 버튼 (마이너스) */}
        <button
          type="button"
          onClick={() => onRemove(schedule.id)}
          className="w-[42px] h-[42px] sm-mobile:w-7 sm-mobile:h-7 ml-[14px] self-center rounded-full flex items-center justify-center transition-colors hover:opacity-80 flex-shrink-0"
          style={{ backgroundColor: "#EDEEF2" }}
          aria-label="시간대 삭제"
        >
          <img
            src={minusIcon}
            alt=""
            className="w-6 h-6 sm-mobile:w-[18px] sm-mobile:h-[18px]"
          />
        </button>
      </div>
    </div>
  );
};

export default ScheduleItem;
