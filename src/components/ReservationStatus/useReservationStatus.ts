import { useState } from "react";
import { useMyActivitiesList } from "../../hooks/queries";
import type { MyActivitiesListResponse } from "../../lib/my-activities/types";

type ReservationStatusType = () => [
  data: MyActivitiesListResponse | undefined,
  activityId: number,
  handleSchedule: (id: number) => void
];

export const useReservationStatus: ReservationStatusType = () => {
  const accessToken = localStorage.getItem("accessToken");
  const { data } = useMyActivitiesList({}, accessToken);
  const [activityId, setActivityId] = useState<number>(-1);

  const handleSchedule = (id: number) => {
    setActivityId(id);
  };

  return [data, activityId, handleSchedule];
};
