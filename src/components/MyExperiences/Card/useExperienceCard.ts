import { useState } from "react";
import { useDeleteMyActivity } from "../../../hooks/mutations/useDeleteMyActivity";
import { getActivityDetail } from "../../../lib/activities/api";
import { getReservedSchedule } from "../../../lib/my-activities/api";

type ExperienceCardType = (
  id: number,
  onDeleteSuccess: () => void
) => [
  isConfirmOpen: boolean,
  isErrorModalOpen: boolean,
  errorMessage: string,
  isCheckingReservations: boolean,
  setIsErrorModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  handleDelete: () => void,
  handleModalClose: () => void,
  handleModalOpen: () => void
];

export const useExperienceCard: ExperienceCardType = (
  id: number,
  onDeleteSuccess: () => void
) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("체험 삭제에 실패했습니다.");
  const [isCheckingReservations, setIsCheckingReservations] = useState(false);

  const authToken = localStorage.getItem("accessToken");
  const deleteActivityMutation = useDeleteMyActivity(authToken || "");

  const handleModalOpen = async () => {
    if (!authToken) {
      setErrorMessage("로그인이 필요합니다.");
      setIsErrorModalOpen(true);
      return;
    }

    setIsCheckingReservations(true);

    try {
      // 1. 체험 상세 조회 (스케줄 날짜 필요)
      const activity = await getActivityDetail(id);

      // 2. 고유 날짜 추출
      const allDates = [...new Set(activity.schedules.map((s) => s.date))];

      // 3. 각 날짜별 예약 현황 조회 (병렬)
      const reservationPromises = allDates.map((date) =>
        getReservedSchedule(id, { date }, authToken)
      );
      const reservationResults = await Promise.all(reservationPromises);

      // 4. 모든 스케줄 flat
      const allSchedules = reservationResults.flat();

      // 5. pending/confirmed 체크
      const hasPending = allSchedules.some((s) => s.count.pending > 0);
      const hasConfirmed = allSchedules.some((s) => s.count.confirmed > 0);

      // 6. 판단
      if (hasPending) {
        setErrorMessage("예약 대기 체험은 삭제가 불가능합니다.");
        setIsErrorModalOpen(true);
        setIsCheckingReservations(false);
        return;
      }

      if (hasConfirmed) {
        setErrorMessage("승인 상태 체험은 삭제가 불가능합니다.");
        setIsErrorModalOpen(true);
        setIsCheckingReservations(false);
        return;
      }

      // 7. 삭제 가능 → 확인 모달
      setIsCheckingReservations(false);
      setIsConfirmOpen(true);
    } catch (error) {
      console.error("예약 현황 조회 실패:", error);
      setErrorMessage("예약 현황을 확인할 수 없습니다.");
      setIsErrorModalOpen(true);
      setIsCheckingReservations(false);
    }
  };

  const handleModalClose = () => {
    setIsConfirmOpen(false);
  };

  const handleDelete = async () => {
    try {
      await deleteActivityMutation.mutateAsync(id);
      setIsConfirmOpen(false);
      onDeleteSuccess();
    } catch (error) {
      console.error("삭제 실패:", error);
      setIsConfirmOpen(false);
      setIsErrorModalOpen(true);
    }
  };

  return [
    isConfirmOpen,
    isErrorModalOpen,
    errorMessage,
    isCheckingReservations,
    setIsErrorModalOpen,
    handleDelete,
    handleModalClose,
    handleModalOpen,
  ];
};
