import { useState } from "react";
import type { Value } from "react-calendar/src/shared/types.js";
import { useReservationDashboard } from "../../../hooks/queries";
import type { ReservationDashboardResponse } from "../../../lib/my-activities/types";

type ReservationStatusCalendarType = (
  activityId: number
) => [
  currentTile: Date,
  isOpen: boolean,
  data: ReservationDashboardResponse | undefined,
  handleDateClick: (
    value: Value,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void,
  handleModalClose: () => void,
  handleActiveStartDateChange: ({
    activeStartDate,
  }: {
    activeStartDate: Date | null;
  }) => void
];

export const useReservationStatusCalendar: ReservationStatusCalendarType = (
  activityId: number
) => {
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

  return [
    currentTile,
    isOpen,
    data,
    handleDateClick,
    handleModalClose,
    handleActiveStartDateChange,
  ];
};
