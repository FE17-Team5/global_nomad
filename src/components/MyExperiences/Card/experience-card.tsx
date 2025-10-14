import { useState } from "react";
import { Link } from "react-router-dom";
import star from "../../../assets/icon/icon_star_on.svg";
import sampleImg from "../../../assets/img/image8.png";
import { useDeleteMyActivity } from "../../../hooks/mutations/useDeleteMyActivity";
import { getActivityDetail } from "../../../lib/activities/api";
import { getReservedSchedule } from "../../../lib/my-activities/api";
import type { components } from "../../../types/api-types";
import { ConfirmModal, Modal } from "../../Modal";

const ExperienceCard = ({
  id,
  title,
  rating,
  reviewCount,
  price,
  bannerImageUrl,
  onDeleteSuccess,
}: components["schemas"]["ActivityBasicDto"] & {
  onDeleteSuccess: () => void;
}) => {
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
        getReservedSchedule(id, { date }, authToken),
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

  return (
    <>
      <div className="flex justify-between items-center p-[30px] rounded-3xl shadow-[0_4px_24px_0_#9CB4CA33] tablet:p-6 tablet:gap-[22px] tablet:items-start">
        <div className="flex flex-col gap-5 tablet:gap-3">
          <h3 className="ty-18_B text-gray-950 tablet:ty-16_B">{title}</h3>
          <div className="flex items-center gap-0.5 ty-16_M text-gray-400 tablet:ty-13_M">
            <img src={star} alt="별점" className="w-4 h-4" />
            <span>{rating}</span>
            <span>({reviewCount})</span>
          </div>
          <div className="flex gap-1 items-center">
            <span className="ty-18_B text-gray_950">
              ₩{price.toLocaleString()}
            </span>
            <span className="ty-16_M text-gray-400 tablet:ty-14_M">/</span>
            <span className="ty-16_M text-gray-400 tablet:ty-14_M">인</span>
          </div>
          <div className="flex gap-2">
            <Link
              to={`/myprofile/edit?id=${id}`}
              state={{ returnTo: "myprofile" }}
              className="px-2.5 py-1.5 border border-gray-50 rounded-[8px] ty-14_M text-gray-600 cursor-pointer"
            >
              수정하기
            </Link>
            <button
              type="button"
              onClick={handleModalOpen}
              disabled={isCheckingReservations}
              className="px-2.5 py-1.5 bg-gray-50 rounded-[8px] ty-14_M text-gray-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCheckingReservations ? "확인 중..." : "삭제하기"}
            </button>
          </div>
        </div>
        <img
          src={bannerImageUrl || sampleImg}
          alt={title}
          className="w-[142px] h-[142px] rounded-4xl object-cover tablet:w-[82px] tablet:h-[82px] tablet:rounded-[20px]"
        />
      </div>

      <ConfirmModal
        message="정말 삭제하시겠습니까?"
        confirmText="삭제하기"
        isOpen={isConfirmOpen}
        onClose={handleModalClose}
        onConfirm={handleDelete}
      />

      <Modal
        message={errorMessage}
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
      />
    </>
  );
};

export default ExperienceCard;
