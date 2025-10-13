/**
 * ReservationSidebar 컴포넌트
 *
 * 우측에 고정 표시되는 예약 카드
 * - 크기: 410px × 746px
 * - 패딩: 30px
 * - 흰색 배경, 회색 테두리, 그림자 효과
 * - 예약 기능:
 *   · 가격 표시
 *   · 날짜 선택 (커스텀 캘린더)
 *   · 시간 선택 (드롭다운)
 *   · 인원 선택
 *   · 총 합계 금액
 *   · 예약하기 버튼
 */

import { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import iconMinus from "../../../assets/icon/icon_minus.svg";
import iconPlus from "../../../assets/icon/icon_plus.svg";
import CustomCalendar from "../../Calendar/custom-calendar";
import { Modal } from "../../Modal";
import type { AvailableSchedule } from "./types";
import { MAX_HEAD_COUNT, MIN_HEAD_COUNT, DEFAULT_HEAD_COUNT } from "./types";
import { getAvailableTimesForDate } from "./utils";
// TODO: API 연동 시 주석 해제
// import { createReservation } from "../../../lib/activities/api";
// import { getAuthToken } from "../../../utils/auth";

interface ReservationSidebarProps {
  price: number;
  availableSchedules: AvailableSchedule[];
}

const ReservationSidebar = ({
  price,
  availableSchedules,
}: ReservationSidebarProps) => {
  const { id: activityId } = useParams();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [headCount, setHeadCount] = useState(DEFAULT_HEAD_COUNT);
  const [selectedTimeId, setSelectedTimeId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDecrease = () => {
    if (headCount > MIN_HEAD_COUNT) {
      setHeadCount(headCount - 1);
    }
  };

  const handleIncrease = () => {
    if (headCount < MAX_HEAD_COUNT) {
      setHeadCount(headCount + 1);
    }
  };

  // 날짜 선택 핸들러 (시간 초기화)
  const handleDateSelect = (date: Date | null) => {
    setSelectedDate(date);
    setSelectedTimeId(null); // 날짜 변경 시 시간 선택 초기화
  };

  // 예약하기 핸들러
  const handleReservation = async () => {
    if (!selectedDate || !selectedTimeId) {
      alert("날짜와 시간을 선택해주세요.");
      return;
    }

    // TODO: API 연동 (테스트 완료)
    /*
    if (!activityId) return;

    try {
      const token = getAuthToken();

      await createReservation(
        Number(activityId),
        {
          scheduleId: selectedTimeId,
          headCount: headCount,
        },
        token
      );

      console.log("예약 성공:", {
        scheduleId: selectedTimeId,
        headCount: headCount,
        totalPrice: price * headCount,
      });

      setIsModalOpen(true);
    } catch (error) {
      console.error("예약 실패:", error);
      alert("예약에 실패했습니다. 다시 시도해주세요.");
    }
    */

    // Mock 테스트
    console.log("예약 요청:", {
      scheduleId: selectedTimeId,
      headCount: headCount,
      totalPrice: price * headCount,
    });
    setIsModalOpen(true);
  };

  // 모달 닫기 핸들러
  const handleModalClose = () => {
    setIsModalOpen(false);

    // 예약 완료 후 상태 초기화 (#6)
    setSelectedDate(null);
    setSelectedTimeId(null);
    setHeadCount(DEFAULT_HEAD_COUNT);
  };

  // 예약 가능한 날짜 추출 (캘린더용) - useMemo로 최적화 (#10)
  const schedulesForCalendar = useMemo(
    () => availableSchedules.map((schedule) => schedule.date),
    [availableSchedules],
  );

  // 선택된 날짜의 예약 가능한 시간 필터링 - 유틸 함수 사용 (#1, #9)
  const availableTimes = useMemo(
    () => getAvailableTimesForDate(selectedDate, availableSchedules),
    [selectedDate, availableSchedules],
  );

  // 선택된 시간이 유효한지 검증 (#22)
  useEffect(() => {
    if (selectedTimeId !== null && availableTimes.length > 0) {
      const isValid = availableTimes.some((time) => time.id === selectedTimeId);
      if (!isValid) {
        setSelectedTimeId(null);
      }
    }
  }, [availableTimes, selectedTimeId]);

  return (
    <aside
      className="max-w-full min-h-[746px] bg-white rounded-3xl p-[30px]"
      style={{
        border: "1px solid var(--color-border-light)",
        boxShadow: "0px 4px 24px 0px var(--shadow-blue-light)",
      }}
      aria-label="예약 정보"
    >
      {/* 예약 카드 내용 */}
      <div className="flex flex-col">
        {/* 가격 정보 */}
        <div className="flex items-center gap-1">
          <span className="ty-24_B" style={{ color: "var(--color-gray-950)" }}>
            ₩ {price.toLocaleString()}
          </span>
          <span className="ty-20_M" style={{ color: "var(--color-gray-200)" }}>
            / 인
          </span>
        </div>

        {/* 날짜 제목 */}
        <h3 className="mt-6 ty-16_B" style={{ color: "var(--color-gray-950)" }}>
          날짜
        </h3>

        {/* 캘린더 */}
        <div className="mt-[10px]">
          <CustomCalendar
            schedules={schedulesForCalendar}
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
          />
        </div>

        {/* 참여 인원 수 */}
        <div className="mt-6 flex items-center justify-between">
          {/* 좌측: 제목 */}
          <h3 className="ty-16_B" style={{ color: "var(--color-gray-950)" }}>
            참여 인원 수
          </h3>

          {/* 우측: 스테퍼 */}
          <div
            className="flex items-center h-10 rounded-3xl"
            style={{ border: "1px solid var(--color-gray-8)" }}
          >
            {/* - 버튼 */}
            <button
              type="button"
              onClick={handleDecrease}
              disabled={!selectedDate || headCount <= MIN_HEAD_COUNT}
              className="max-w-10 max-h-10 w-10 h-10 flex items-center justify-center"
              style={{
                cursor:
                  !selectedDate || headCount <= MIN_HEAD_COUNT
                    ? "not-allowed"
                    : "pointer",
                opacity: !selectedDate || headCount <= MIN_HEAD_COUNT ? 0.3 : 1,
              }}
              aria-label="인원 감소"
            >
              <img
                src={iconMinus}
                alt=""
                className="w-6 h-6"
                style={{
                  filter:
                    !selectedDate || headCount <= MIN_HEAD_COUNT
                      ? "brightness(0) saturate(100%) invert(80%) sepia(0%) saturate(0%)"
                      : "none",
                }}
              />
            </button>

            {/* 숫자 */}
            <div
              className="max-w-10 max-h-10 w-10 h-10 flex items-center justify-center ty-16_B"
              style={{ color: "var(--color-gray-1)" }}
            >
              {headCount}
            </div>

            {/* + 버튼 */}
            <button
              type="button"
              onClick={handleIncrease}
              disabled={!selectedDate || headCount >= MAX_HEAD_COUNT}
              className="max-w-10 max-h-10 w-10 h-10 flex items-center justify-center"
              style={{
                cursor:
                  !selectedDate || headCount >= MAX_HEAD_COUNT
                    ? "not-allowed"
                    : "pointer",
                opacity: !selectedDate || headCount >= MAX_HEAD_COUNT ? 0.3 : 1,
              }}
              aria-label="인원 증가"
            >
              <img
                src={iconPlus}
                alt=""
                className="w-6 h-6"
                style={{
                  filter:
                    !selectedDate || headCount >= MAX_HEAD_COUNT
                      ? "brightness(0) saturate(100%) invert(80%) sepia(0%) saturate(0%)"
                      : "none",
                }}
              />
            </button>
          </div>
        </div>

        {/* 예약 가능한 시간 */}
        <div className="mt-6">
          {/* 제목 */}
          <h3 className="ty-16_B" style={{ color: "var(--color-gray-950)" }}>
            예약 가능한 시간
          </h3>

          {/* 시간 버튼 리스트 - 스크롤 가능 */}
          <div
            className="mt-[14px] flex flex-col gap-3 overflow-y-auto"
            style={{
              maxHeight: "200px", // 버튼 3개 정도 높이 (46px × 3 + 12px × 2 = 162px + 여유)
              scrollbarWidth: "thin",
              scrollbarColor: "var(--color-gray-300) transparent",
            }}
          >
            {availableTimes.length > 0 ? (
              availableTimes.map((schedule) => (
                <button
                  type="button"
                  key={schedule.id}
                  onClick={() => setSelectedTimeId(schedule.id)}
                  disabled={!selectedDate}
                  className="w-full h-[46px] flex items-center justify-center rounded-md ty-16_M transition-colors flex-shrink-0"
                  style={{
                    border:
                      selectedTimeId === schedule.id
                        ? "2px solid var(--color-primary-500)"
                        : "1px solid var(--color-gray-300)",
                    backgroundColor:
                      selectedTimeId === schedule.id
                        ? "var(--color-primary-100)"
                        : "transparent",
                    color:
                      selectedTimeId === schedule.id
                        ? "var(--color-primary-500)"
                        : "var(--color-gray-950)",
                    cursor: !selectedDate ? "not-allowed" : "pointer",
                    opacity: !selectedDate ? 0.5 : 1,
                  }}
                  aria-label={`${schedule.startTime}부터 ${schedule.endTime}까지`}
                  aria-pressed={selectedTimeId === schedule.id}
                >
                  {schedule.startTime} ~ {schedule.endTime}
                </button>
              ))
            ) : (
              <p
                className="ty-14_M text-center py-4"
                style={{ color: "var(--color-gray-200)" }}
              >
                날짜를 먼저 선택해주세요
              </p>
            )}
          </div>
        </div>

        {/* 하단 컨테이너 - 총 합계 및 예약 버튼 */}
        <div
          className="mt-[33px] h-20 flex items-center justify-between pt-6"
          style={{ borderTop: "1px solid var(--color-border-light)" }}
        >
          {/* 좌측: 총 합계 */}
          <div className="flex flex-col gap-1">
            <span className="ty-20_M" style={{ color: "var(--color-gray-2)" }}>
              총 합계
            </span>
            <span
              className="ty-20_B"
              style={{ color: "var(--color-gray-950)" }}
            >
              ₩ {(price * headCount).toLocaleString()}
            </span>
          </div>

          {/* 우측: 예약하기 버튼 */}
          <button
            type="button"
            onClick={handleReservation}
            disabled={!selectedDate || !selectedTimeId}
            className="px-6 h-12 rounded-md ty-16_B transition-colors"
            style={{
              backgroundColor:
                !selectedDate || !selectedTimeId
                  ? "var(--color-gray-300)"
                  : "var(--color-primary-500)",
              color: "var(--color-white)",
              cursor:
                !selectedDate || !selectedTimeId ? "not-allowed" : "pointer",
            }}
            aria-label="예약하기"
          >
            예약하기
          </button>
        </div>

        {/* 예약 완료 모달 */}
        <Modal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          message="예약이 완료되었습니다."
        />
      </div>
    </aside>
  );
};

export default ReservationSidebar;
