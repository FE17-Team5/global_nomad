import { useState } from "react";
import { formatDateToString } from "../../../utils/date";
import {
  useActivityReservations,
  useReservedSchedule,
} from "../../../hooks/queries";
import type {
  ActivityReservationsResponse,
  UpdateReservationStatusBody,
} from "../../../lib/my-activities/types";

export const STATUS_TABS: {
  index: number;
  label: string;
  countKey: UpdateReservationStatusBody["status"];
}[] = [
  { index: 0, label: "신청", countKey: "pending" },
  { index: 1, label: "승인", countKey: "confirmed" },
  { index: 2, label: "거절", countKey: "declined" },
];

type ReservationsStatusModalType = (
  activityId: number,
  date: Date
) => [
  reservations: ActivityReservationsResponse | undefined,
  selectedIndex: number,
  title: string,
  totalCounts:
    | {
        pending: number;
        confirmed: number;
        declined: number;
      }
    | undefined,
  filteredSchedules:
    | {
        scheduleId: number;
        startTime: string;
        endTime: string;
        count: {
          declined: number;
          confirmed: number;
          pending: number;
        };
      }[]
    | undefined,
  setScheduleId: React.Dispatch<React.SetStateAction<number>>,
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>,
  handleScheduleId: (scheduleId: number) => void,
  handleStatusClick: (index: number) => void,
  handleTitle: (title: string) => void
];

export const useReservationStatusModal: ReservationsStatusModalType = (
  activityId: number,
  date: Date
) => {
  const accessToken = localStorage.getItem("accessToken");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scheduleId, setScheduleId] = useState(-1);
  const [title, setTitle] = useState("시간 선택");
  const initialCounts = { pending: 0, confirmed: 0, declined: 0 };

  const { data: schedules } = useReservedSchedule(
    activityId,
    {
      date: formatDateToString(date),
    },
    accessToken
  );

  const { data: reservations } = useActivityReservations(
    activityId,
    {
      scheduleId,
      status: STATUS_TABS[selectedIndex].countKey,
    },
    accessToken
  );

  const totalCounts = schedules?.reduce((prev, next) => {
    prev.pending += next.count.pending;
    prev.confirmed += next.count.confirmed;
    prev.declined += next.count.declined;
    return prev;
  }, initialCounts);

  const currentStatusKey = STATUS_TABS[selectedIndex].countKey;

  const filteredSchedules = schedules?.filter(
    (schedule) => schedule.count[currentStatusKey] > 0
  );

  const handleStatusClick = (index: number) => {
    setSelectedIndex(index);
    setScheduleId(-1);
    handleTitle("시간 선택");
  };

  const handleTitle = (title: string) => {
    setTitle(title);
  };

  const handleScheduleId = (scheduleId: number) => {
    setScheduleId(scheduleId);
  };

  return [
    reservations,
    selectedIndex,
    title,
    totalCounts,
    filteredSchedules,
    setScheduleId,
    setSelectedIndex,
    handleScheduleId,
    handleStatusClick,
    handleTitle,
  ];
};
