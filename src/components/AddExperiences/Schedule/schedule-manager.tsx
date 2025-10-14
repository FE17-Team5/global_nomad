import { useState } from "react";
import { formatDateToString } from "../../../utils/date";
import ScheduleInput from "./schedule-input";
import ScheduleItem from "./schedule-item";
import type { Schedule } from "./types";
import { isTimeOverlapping, timeToMinutes } from "./utils";

interface ScheduleManagerProps {
  schedules: Schedule[];
  onSchedulesChange: (schedules: Schedule[]) => void;
  onShowModal: (message: string) => void;
}

const ScheduleManager = ({
  schedules,
  onSchedulesChange,
  onShowModal,
}: ScheduleManagerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [nextId, setNextId] = useState(1);

  const isAddButtonEnabled = selectedDate && startTime && endTime;

  // 스케줄 추가
  const handleAddSchedule = () => {
    if (!selectedDate || !startTime || !endTime) return;

    // 시작 시간이 종료 시간보다 늦으면 경고
    if (timeToMinutes(startTime) >= timeToMinutes(endTime)) {
      onShowModal("종료 시간은 시작 시간보다 늦어야 합니다.");
      return;
    }

    // 날짜를 YYYY-MM-DD 형식으로 변환
    const dateStr = formatDateToString(selectedDate);

    // 시간 겹침 체크
    if (isTimeOverlapping(schedules, dateStr, startTime, endTime)) {
      onShowModal("같은 날짜에 이미 등록된 시간대와 겹칩니다.");
      return;
    }

    // 스케줄 추가
    const newSchedule: Schedule = {
      id: nextId,
      date: dateStr,
      startTime,
      endTime,
    };

    onSchedulesChange([...schedules, newSchedule]);
    setNextId(nextId + 1);

    // 입력 필드 초기화
    setSelectedDate(null);
    setStartTime("");
    setEndTime("");
  };

  // 스케줄 삭제
  const handleRemoveSchedule = (id: number) => {
    onSchedulesChange(schedules.filter((schedule) => schedule.id !== id));
  };

  // 스케줄 시간 수정
  const handleUpdateScheduleTime = (
    id: number,
    field: "startTime" | "endTime",
    value: string,
  ) => {
    const targetSchedule = schedules.find((s) => s.id === id);
    if (!targetSchedule) return;

    const updatedSchedule = { ...targetSchedule, [field]: value };

    // 시작 시간이 종료 시간보다 늦으면 경고
    if (
      timeToMinutes(updatedSchedule.startTime) >=
      timeToMinutes(updatedSchedule.endTime)
    ) {
      onShowModal("종료 시간은 시작 시간보다 늦어야 합니다.");
      return;
    }

    // 다른 스케줄과 겹침 체크
    if (
      isTimeOverlapping(
        schedules,
        updatedSchedule.date,
        updatedSchedule.startTime,
        updatedSchedule.endTime,
        id,
      )
    ) {
      onShowModal("같은 날짜에 이미 등록된 시간대와 겹칩니다.");
      return;
    }

    // 검증 통과 시 업데이트
    onSchedulesChange(
      schedules.map((schedule) =>
        schedule.id === id ? updatedSchedule : schedule,
      ),
    );
  };

  return (
    <>
      <h2 className="mt-[30px] ty-16_B" style={{ color: "#1F1F22" }}>
        예약 가능한 시간대
      </h2>

      {/* 시간대 입력 */}
      <ScheduleInput
        selectedDate={selectedDate}
        startTime={startTime}
        endTime={endTime}
        onDateChange={setSelectedDate}
        onStartTimeChange={setStartTime}
        onEndTimeChange={setEndTime}
        onAdd={handleAddSchedule}
        isAddEnabled={!!isAddButtonEnabled}
      />

      {/* 추가된 스케줄 목록 */}
      {schedules.length > 0 && (
        <>
          {/* 구분선 */}
          <div
            className="w-full h-[1px] my-5 sm-mobile:my-[18px]"
            style={{ backgroundColor: "#E0E0E5" }}
          />

          {/* 스케줄 리스트 */}
          <div className="flex flex-col gap-5 sm-mobile:gap-4">
            {schedules.map((schedule) => (
              <ScheduleItem
                key={schedule.id}
                schedule={schedule}
                onRemove={handleRemoveSchedule}
                onUpdateTime={handleUpdateScheduleTime}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default ScheduleManager;
