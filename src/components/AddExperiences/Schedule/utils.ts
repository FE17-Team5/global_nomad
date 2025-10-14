import type { Schedule } from "./types";

// 30분 단위 시간 생성 (00:00 ~ 23:30)
export const generateTimeSlots = () => {
  const times: string[] = [];
  for (let hour = 0; hour < 24; hour++) {
    times.push(`${String(hour).padStart(2, "0")}:00`);
    times.push(`${String(hour).padStart(2, "0")}:30`);
  }
  return times;
};

export const TIME_SLOTS = generateTimeSlots();

// 시간을 분으로 변환
export const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

// 시간 겹침 체크
export const isTimeOverlapping = (
  schedules: Schedule[],
  targetDate: string,
  startTime: string,
  endTime: string,
  excludeId?: number,
): boolean => {
  const newStart = timeToMinutes(startTime);
  const newEnd = timeToMinutes(endTime);

  return schedules.some((schedule) => {
    if (schedule.id === excludeId) return false;
    if (schedule.date !== targetDate) return false;

    const existingStart = timeToMinutes(schedule.startTime);
    const existingEnd = timeToMinutes(schedule.endTime);

    return (
      (newStart >= existingStart && newStart < existingEnd) ||
      (newEnd > existingStart && newEnd <= existingEnd) ||
      (newStart <= existingStart && newEnd >= existingEnd)
    );
  });
};
