/**
 * KebabMenu 컴포넌트
 *
 * 케밥 버튼 클릭 시 드롭다운 메뉴 표시
 * - 수정하기: 수정 페이지로 이동
 * - 삭제하기: 삭제 확인 후 메인 페이지로 이동
 * - 외부 클릭 시 자동 닫힘
 * - ESC 키로 닫기
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import iconMore from "../../assets/icon/icon_more.svg";
import { useDeleteMyActivity } from "../../hooks/mutations/useDeleteMyActivity";
import { getActivityDetail } from "../../lib/activities/api";
import { getReservedSchedule } from "../../lib/my-activities/api";
import { Dropdown } from "../Dropdown";
import { ConfirmModal, Modal } from "../Modal";

interface KebabMenuProps {
  activityId: number;
}

const KebabMenu = ({ activityId }: KebabMenuProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("체험 삭제에 실패했습니다.");
  const [_isCheckingReservations, setIsCheckingReservations] = useState(false);
  const navigate = useNavigate();

  const authToken = localStorage.getItem("accessToken");
  const deleteActivityMutation = useDeleteMyActivity(authToken || "");

  const handleEdit = () => {
    navigate(`/myprofile/edit?id=${activityId}`, {
      state: { returnTo: "detail", activityId },
    });
  };

  const handleDelete = async () => {
    if (!authToken) {
      setErrorMessage("로그인이 필요합니다.");
      setIsErrorModalOpen(true);
      return;
    }

    setIsCheckingReservations(true);

    try {
      // 1. 체험 상세 조회 (스케줄 날짜 필요)
      const activity = await getActivityDetail(activityId);

      // 2. 고유 날짜 추출
      const allDates = [...new Set(activity.schedules.map((s) => s.date))];

      // 3. 각 날짜별 예약 현황 조회 (병렬)
      const reservationPromises = allDates.map((date) =>
        getReservedSchedule(activityId, { date }, authToken),
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
      setIsDeleteModalOpen(true);
    } catch (error) {
      console.error("예약 현황 조회 실패:", error);
      setErrorMessage("예약 현황을 확인할 수 없습니다.");
      setIsErrorModalOpen(true);
      setIsCheckingReservations(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setIsDeleteModalOpen(false);

    try {
      await deleteActivityMutation.mutateAsync(activityId);
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("삭제 실패:", error);
      setIsErrorModalOpen(true);
    }
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
    navigate("/");
  };

  // 드롭다운 메뉴 아이템
  const dropdownItems = [
    {
      label: "수정하기",
      onClick: handleEdit,
    },
    {
      label: "삭제하기",
      onClick: handleDelete,
    },
  ];

  return (
    <>
      {/* 케밥 버튼 + 드롭다운 */}
      <Dropdown
        trigger={
          <button
            type="button"
            className="p-2 rounded-full cursor-pointer transition-colors duration-200 hover:bg-gray-100"
            aria-label="더보기"
          >
            <img className="w-7 h-7" src={iconMore} alt="" />
          </button>
        }
        items={dropdownItems}
        align="right"
      />

      {/* 삭제 확인 모달 */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        message="체험을 삭제하시겠습니까?"
        confirmText="네"
      />

      {/* 삭제 성공 모달 */}
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={handleSuccessModalClose}
        message="체험이 삭제되었습니다."
      />

      {/* 삭제 실패 모달 */}
      <Modal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        message={errorMessage}
      />
    </>
  );
};

export default KebabMenu;
