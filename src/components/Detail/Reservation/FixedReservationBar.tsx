/**
 * FixedReservationBar 컴포넌트 (태블릿 전용)
 *
 * 하단에 고정되는 예약 UI
 * - 기본 상태: 124px (가격 표시 + 예약하기 버튼)
 * - 확장 상태: 675px (날짜 선택 + 캘린더 + 시간 선택)
 */

import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import iconBack from "../../../assets/icon/icon_back.svg";
import iconMinus from "../../../assets/icon/icon_minus.svg";
import iconPlus from "../../../assets/icon/icon_plus.svg";
import { useCreateReservation } from "../../../hooks/mutations/useCreateReservation";
import { useMyReservationsList } from "../../../hooks/queries/useMyReservationsList";
import { formatDateShort } from "../../../utils/date";
import CustomCalendar from "../../Calendar/custom-calendar";
import { Modal } from "../../Modal";
import { BREAKPOINTS, RESERVATION_UI_HEIGHTS } from "./constants";
import type { AvailableSchedule } from "./types";
import { DEFAULT_HEAD_COUNT, MAX_HEAD_COUNT, MIN_HEAD_COUNT } from "./types";
import { getAvailableTimesForDate, getTimeById } from "./utils";

interface FixedReservationBarProps {
  price: number;
  availableSchedules: AvailableSchedule[];
}

const FixedReservationBar = ({
  price,
  availableSchedules,
}: FixedReservationBarProps) => {
  const { id } = useParams();
  const activityId = Number(id);
  const authToken = localStorage.getItem("accessToken");
  const queryClient = useQueryClient();

  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeId, setSelectedTimeId] = useState<number | null>(null);
  const [headCount, setHeadCount] = useState(DEFAULT_HEAD_COUNT);
  const [showHeadCountSelector, setShowHeadCountSelector] = useState(false); // 모바일 인원 선택 모드
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const createReservationMutation = useCreateReservation(
    activityId,
    authToken || "",
  );

  // 내 예약 내역 조회 (중복 예약 체크 - 시간 버튼에서 사용)
  const { data: myReservations } = useMyReservationsList(
    { size: 100 },
    authToken,
  );

  // 선택된 날짜의 예약 가능한 시간 조회 - 유틸 함수 사용 (#1, #4, #9)
  const availableTimes = useMemo(
    () => getAvailableTimesForDate(selectedDate, availableSchedules),
    [selectedDate, availableSchedules],
  );

  // 선택된 시간 정보 조회 - 유틸 함수 및 useMemo 사용 (#8)
  const selectedTime = useMemo(
    () => getTimeById(selectedTimeId, availableSchedules),
    [selectedTimeId, availableSchedules],
  );

  // body scroll 관리 - cleanup 함수 추가 (#5, #21)
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [isExpanded]);

  // 선택된 시간이 유효한지 검증 (#22)
  useEffect(() => {
    if (selectedTimeId !== null && availableTimes.length > 0) {
      const isValid = availableTimes.some((time) => time.id === selectedTimeId);
      if (!isValid) {
        setSelectedTimeId(null);
      }
    }
  }, [availableTimes, selectedTimeId]);

  // 화면 크기 변경 시 상태 초기화 (태블릿/모바일 → PC 전환 대응)
  useEffect(() => {
    const handleResize = () => {
      // 태블릿 breakpoint: 744px (46.5rem)
      const isTablet = window.innerWidth <= BREAKPOINTS.TABLET;

      // PC 화면으로 전환되면 상태 초기화
      if (!isTablet && isExpanded) {
        setIsExpanded(false);
        setShowHeadCountSelector(false);
        document.body.style.overflow = "auto";
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isExpanded]);

  // 날짜 선택하기 클릭
  const handleOpenCalendar = () => {
    setIsExpanded(true);
  };

  // 확인 버튼 클릭 (태블릿: 바로 닫기, 모바일: 인원 선택으로)
  const handleConfirm = () => {
    // 모바일에서 날짜/시간 선택 완료 → 인원 선택 모드로
    const isMobile = window.innerWidth <= 375;

    if (isMobile && !showHeadCountSelector) {
      setShowHeadCountSelector(true);
    } else {
      // 태블릿 또는 모바일 인원 선택 완료 → 닫기
      setIsExpanded(false);
      setShowHeadCountSelector(false);
    }
  };

  // 뒤로가기 (모바일 인원 선택 → 날짜 선택)
  const handleBack = () => {
    setShowHeadCountSelector(false);
  };

  // 인원 수 감소
  const handleDecrease = () => {
    if (headCount > MIN_HEAD_COUNT) {
      setHeadCount(headCount - 1);
    }
  };

  // 인원 수 증가
  const handleIncrease = () => {
    if (headCount < MAX_HEAD_COUNT) {
      setHeadCount(headCount + 1);
    }
  };

  // 예약하기 버튼 클릭
  const handleReservation = async () => {
    if (!selectedDate || !selectedTimeId) {
      setErrorMessage("날짜와 시간을 선택해주세요.");
      setIsErrorModalOpen(true);
      return;
    }

    if (!authToken) {
      setErrorMessage("로그인이 필요합니다.");
      setIsErrorModalOpen(true);
      return;
    }

    try {
      await createReservationMutation.mutateAsync({
        scheduleId: selectedTimeId,
        headCount: headCount,
      });

      setIsModalOpen(true);
      setIsExpanded(false);
    } catch (error) {
      console.error("예약 실패:", error);
      setErrorMessage("예약에 실패했습니다. 다시 시도해주세요.");
      setIsErrorModalOpen(true);
    }
  };

  // 모달 닫기 핸들러
  const handleModalClose = async () => {
    setIsModalOpen(false);

    // 예약 완료 후 데이터 갱신
    await queryClient.refetchQueries({
      queryKey: ["my-reservations"],
      exact: false,
    });
    await queryClient.refetchQueries({
      queryKey: ["activity", activityId, "schedule"],
      exact: false,
    });

    // 예약 완료 후 상태 초기화 (#6)
    setSelectedDate(null);
    setSelectedTimeId(null);
    setHeadCount(DEFAULT_HEAD_COUNT);
    setIsExpanded(false);
    setShowHeadCountSelector(false);
  };

  // 날짜 포맷팅 (22/11/14 14:00 ~ 15:00) - 유틸 함수 사용 (#7)
  const formatSelectedDateTime = () => {
    if (!selectedDate || !selectedTime) return "날짜 선택하기";

    return `${formatDateShort(selectedDate)} ${selectedTime.startTime} ~ ${selectedTime.endTime}`;
  };

  return (
    <>
      {/* 딤드 처리 */}
      {isExpanded && (
        <button
          type="button"
          className="fixed inset-0 z-40 cursor-default"
          style={{ background: "#00000080" }}
          onClick={handleConfirm}
          onKeyDown={(e) => {
            if (e.key === "Escape" || e.key === "Enter") {
              handleConfirm();
            }
          }}
          aria-label="예약 닫기"
        />
      )}

      {/* 하단 픽스 UI */}
      <div
        className="hidden sm-tablet:flex sm-mobile:flex fixed bottom-0 left-0 right-0 bg-white z-50 flex-col transition-all duration-300"
        style={{
          height: isExpanded
            ? showHeadCountSelector
              ? "auto" // 모바일 인원 선택 모드: 동적 높이
              : window.innerWidth <= 375
                ? "auto" // 모바일 날짜 선택 모드: 동적 높이
                : `${RESERVATION_UI_HEIGHTS.EXPANDED}px` // 태블릿 날짜 선택 모드: 고정 높이
            : `${RESERVATION_UI_HEIGHTS.COLLAPSED}px`,
          borderRadius: isExpanded ? "16px 16px 0 0" : "0",
          boxShadow: "0px -4px 16px 0px rgba(0, 0, 0, 0.1)",
        }}
      >
        {!isExpanded ? (
          // ======= 기본 상태 (124px) =======
          <div className="py-[18px] px-6 flex flex-col h-full">
            {/* 상단: 가격 + 날짜 선택 링크 */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1">
                <span
                  className="ty-18_B"
                  style={{ color: "var(--color-gray-950)" }}
                >
                  ₩ {(price * headCount).toLocaleString()}
                </span>
                <span
                  className="ty-16_M"
                  style={{ color: "var(--color-gray-2)" }}
                >
                  / {headCount}명
                </span>
              </div>

              <button
                type="button"
                onClick={handleOpenCalendar}
                className="ty-16_B"
                style={{ color: "var(--color-primary-500)" }}
              >
                {formatSelectedDateTime()}
              </button>
            </div>

            {/* 하단: 예약하기 버튼 */}
            <button
              type="button"
              onClick={handleReservation}
              disabled={!selectedDate || !selectedTimeId}
              className="w-full h-[50px] rounded-md ty-16_B transition-colors"
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
        ) : showHeadCountSelector ? (
          // ======= 모바일 인원 선택 모드 (동적 높이) =======
          <div className="px-6 py-[18px] flex flex-col">
            {/* 뒤로가기 + 인원 제목 */}
            <div className="flex items-center gap-2 mb-2">
              <button
                type="button"
                onClick={handleBack}
                className="w-6 h-6 flex items-center justify-center"
                aria-label="뒤로가기"
              >
                <img src={iconBack} alt="뒤로" className="w-6 h-6" />
              </button>
              <h2
                className="ty-18_B"
                style={{ color: "var(--color-gray-950)" }}
              >
                인원
              </h2>
            </div>

            {/* 부제목 */}
            <p className="ty-16_M" style={{ color: "#4B4B4B" }}>
              예약할 인원을 선택해주세요.
            </p>

            {/* 참여 인원 수 */}
            <div className="mt-5 flex items-center justify-between">
              <span
                className="ty-16_B"
                style={{ color: "var(--color-gray-950)" }}
              >
                참여 인원 수
              </span>

              {/* 스피너 */}
              <div
                className="w-36 h-12 flex items-center justify-between rounded-3xl"
                style={{ border: "1px solid var(--color-gray-8)" }}
              >
                <button
                  type="button"
                  onClick={handleDecrease}
                  disabled={headCount <= MIN_HEAD_COUNT}
                  className="w-12 h-12 flex items-center justify-center"
                  style={{
                    cursor:
                      headCount <= MIN_HEAD_COUNT ? "not-allowed" : "pointer",
                    opacity: headCount <= MIN_HEAD_COUNT ? 0.3 : 1,
                  }}
                  aria-label="인원 감소"
                >
                  <img
                    src={iconMinus}
                    alt=""
                    className="w-6 h-6"
                    style={{
                      filter:
                        headCount <= MIN_HEAD_COUNT
                          ? "brightness(0) saturate(100%) invert(80%) sepia(0%) saturate(0%)"
                          : "none",
                    }}
                  />
                </button>

                <div
                  className="flex-1 text-center ty-16_B"
                  style={{ color: "var(--color-gray-1)" }}
                >
                  {headCount}
                </div>

                <button
                  type="button"
                  onClick={handleIncrease}
                  disabled={headCount >= MAX_HEAD_COUNT}
                  className="w-12 h-12 flex items-center justify-center"
                  style={{
                    cursor:
                      headCount >= MAX_HEAD_COUNT ? "not-allowed" : "pointer",
                    opacity: headCount >= MAX_HEAD_COUNT ? 0.3 : 1,
                  }}
                  aria-label="인원 증가"
                >
                  <img
                    src={iconPlus}
                    alt=""
                    className="w-6 h-6"
                    style={{
                      filter:
                        headCount >= MAX_HEAD_COUNT
                          ? "brightness(0) saturate(100%) invert(80%) sepia(0%) saturate(0%)"
                          : "none",
                    }}
                  />
                </button>
              </div>
            </div>

            {/* 확인 버튼 */}
            <button
              type="button"
              onClick={handleConfirm}
              className="w-full h-[50px] rounded-md ty-16_B transition-colors mt-[30px]"
              style={{
                backgroundColor: "var(--color-primary-500)",
                color: "var(--color-white)",
              }}
              aria-label="확인"
            >
              확인
            </button>
          </div>
        ) : (
          // ======= 확장 상태: 날짜 선택 모드 (태블릿 680px / 모바일 동적) =======
          <>
            {/* 상단 콘텐츠 영역 */}
            <div className="px-[30px] sm-mobile:px-6 pt-6 sm-mobile:pt-[18px] flex-1">
              {/* 제목 */}
              <h2
                className="ty-20_B sm-mobile:ty-18_B mb-6 sm-mobile:mb-2"
                style={{ color: "var(--color-gray-950)" }}
              >
                날짜
              </h2>

              {/* 캘린더 + 예약 가능한 시간 */}
              <div className="flex sm-mobile:flex-col justify-between gap-6">
                {/* 좌측/상단: 캘린더 */}
                <div className="max-w-[359px] sm-mobile:max-w-full flex-shrink-0 sm-mobile:flex-shrink">
                  <CustomCalendar
                    selectedDate={selectedDate}
                    onDateSelect={(date) => {
                      setSelectedDate(date);
                      setSelectedTimeId(null); // 날짜 변경 시 시간 초기화
                    }}
                    schedules={availableSchedules.map((s) => s.date)}
                  />
                </div>

                {/* 우측: 예약 가능한 시간 (태블릿 전용) */}
                <div
                  className="hidden sm-tablet:flex sm-mobile:hidden max-w-[301px] flex-1 p-6 rounded-2xl flex-col"
                  style={{
                    boxShadow: "0px 4px 24px 0px rgba(156, 180, 202, 0.2)",
                    height: `${RESERVATION_UI_HEIGHTS.CALENDAR_CONTAINER}px`,
                  }}
                >
                  <h3
                    className="ty-16_B flex-shrink-0"
                    style={{ color: "var(--color-gray-950)" }}
                  >
                    예약 가능한 시간
                  </h3>

                  {!selectedDate ? (
                    // 날짜 미선택 시
                    <p
                      className="ty-16_M text-center mt-[14px]"
                      style={{ color: "var(--color-gray-1)" }}
                    >
                      날짜를 선택하세요.
                    </p>
                  ) : availableTimes.length === 0 ? (
                    // 예약 가능한 시간 없음
                    <p
                      className="ty-16_M text-center mt-[14px]"
                      style={{ color: "var(--color-gray-1)" }}
                    >
                      예약 가능한 시간이 없습니다.
                    </p>
                  ) : (
                    // 시간 선택 UI
                    <div
                      className="mt-5 flex flex-col flex-1 overflow-y-auto"
                      style={{
                        scrollbarWidth: "thin",
                        scrollbarColor: "var(--color-gray-300) transparent",
                      }}
                    >
                      {/* 시간 버튼들 */}
                      <div className="flex flex-col gap-3">
                        {availableTimes.map((time) => {
                          const isTimeBooked =
                            myReservations?.reservations.some(
                              (reservation) =>
                                reservation.activity.id === activityId &&
                                reservation.scheduleId === time.id &&
                                reservation.status !== "canceled" &&
                                reservation.status !== "declined",
                            );

                          return (
                            <button
                              key={time.id}
                              type="button"
                              onClick={() =>
                                !isTimeBooked && setSelectedTimeId(time.id)
                              }
                              disabled={isTimeBooked}
                              className="max-w-[253px] h-[51px] rounded-lg ty-16_M transition-colors"
                              style={{
                                border: isTimeBooked
                                  ? "1px solid var(--color-gray-200)"
                                  : selectedTimeId === time.id
                                    ? "2px solid var(--color-primary-500)"
                                    : "1px solid var(--color-gray-300)",
                                color: isTimeBooked
                                  ? "var(--color-gray-400)"
                                  : selectedTimeId === time.id
                                    ? "var(--color-primary-500)"
                                    : "var(--color-gray-950)",
                                backgroundColor: isTimeBooked
                                  ? "var(--color-gray-100)"
                                  : selectedTimeId === time.id
                                    ? "var(--color-primary-100)"
                                    : "transparent",
                                cursor: isTimeBooked
                                  ? "not-allowed"
                                  : "pointer",
                                opacity: isTimeBooked ? 0.5 : 1,
                              }}
                              aria-pressed={selectedTimeId === time.id}
                            >
                              {time.startTime} ~ {time.endTime}
                            </button>
                          );
                        })}
                      </div>

                      {/* 참여 인원 수 */}
                      <div className="mt-9">
                        <h4
                          className="ty-16_B mb-5"
                          style={{ color: "var(--color-gray-950)" }}
                        >
                          참여 인원 수
                        </h4>

                        {/* 스피너 */}
                        <div
                          className="max-w-[253px] h-[51px] flex items-center justify-between rounded-3xl"
                          style={{ border: "1px solid var(--color-gray-8)" }}
                        >
                          <button
                            type="button"
                            onClick={handleDecrease}
                            disabled={headCount <= MIN_HEAD_COUNT}
                            className="w-[51px] h-[51px] flex items-center justify-center"
                            style={{
                              cursor:
                                headCount <= MIN_HEAD_COUNT
                                  ? "not-allowed"
                                  : "pointer",
                              opacity: headCount <= MIN_HEAD_COUNT ? 0.3 : 1,
                            }}
                            aria-label="인원 감소"
                          >
                            <img
                              src={iconMinus}
                              alt=""
                              className="w-6 h-6"
                              style={{
                                filter:
                                  headCount <= MIN_HEAD_COUNT
                                    ? "brightness(0) saturate(100%) invert(80%) sepia(0%) saturate(0%)"
                                    : "none",
                              }}
                            />
                          </button>

                          <div
                            className="flex-1 text-center ty-16_B"
                            style={{ color: "var(--color-gray-1)" }}
                          >
                            {headCount}
                          </div>

                          <button
                            type="button"
                            onClick={handleIncrease}
                            disabled={headCount >= MAX_HEAD_COUNT}
                            className="w-[51px] h-[51px] flex items-center justify-center"
                            style={{
                              cursor:
                                headCount >= MAX_HEAD_COUNT
                                  ? "not-allowed"
                                  : "pointer",
                              opacity: headCount >= MAX_HEAD_COUNT ? 0.3 : 1,
                            }}
                            aria-label="인원 증가"
                          >
                            <img
                              src={iconPlus}
                              alt=""
                              className="w-6 h-6"
                              style={{
                                filter:
                                  headCount >= MAX_HEAD_COUNT
                                    ? "brightness(0) saturate(100%) invert(80%) sepia(0%) saturate(0%)"
                                    : "none",
                              }}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 모바일 전용: 예약 가능한 시간 */}
                <div className="hidden sm-mobile:block mt-6">
                  <h3
                    className="ty-16_B mb-[14px]"
                    style={{ color: "var(--color-gray-950)" }}
                  >
                    예약 가능한 시간
                  </h3>

                  {!selectedDate ? (
                    <p
                      className="ty-16_M text-center py-4"
                      style={{ color: "var(--color-gray-1)" }}
                    >
                      날짜를 선택해주세요.
                    </p>
                  ) : availableTimes.length === 0 ? (
                    <p
                      className="ty-16_M text-center py-4"
                      style={{ color: "var(--color-gray-1)" }}
                    >
                      예약 가능한 시간이 없습니다.
                    </p>
                  ) : (
                    <div
                      className="flex flex-col gap-3"
                      style={{
                        maxHeight:
                          availableTimes.length > 2
                            ? "calc(51px * 2 + 12px)"
                            : "none",
                        overflowY:
                          availableTimes.length > 2 ? "auto" : "visible",
                      }}
                    >
                      {availableTimes.map((time) => {
                        const isTimeBooked = myReservations?.reservations.some(
                          (reservation) =>
                            reservation.activity.id === activityId &&
                            reservation.scheduleId === time.id &&
                            reservation.status !== "canceled" &&
                            reservation.status !== "declined",
                        );

                        return (
                          <button
                            key={time.id}
                            type="button"
                            onClick={() =>
                              !isTimeBooked && setSelectedTimeId(time.id)
                            }
                            disabled={isTimeBooked}
                            className="w-full rounded-lg ty-16_M transition-colors flex items-center justify-center flex-shrink-0"
                            style={{
                              height: "51px",
                              minHeight: "51px",
                              border: isTimeBooked
                                ? "1px solid var(--color-gray-200)"
                                : selectedTimeId === time.id
                                  ? "2px solid var(--color-primary-500)"
                                  : "1px solid var(--color-gray-300)",
                              color: isTimeBooked
                                ? "var(--color-gray-400)"
                                : selectedTimeId === time.id
                                  ? "var(--color-primary-500)"
                                  : "var(--color-gray-950)",
                              backgroundColor: isTimeBooked
                                ? "var(--color-gray-100)"
                                : selectedTimeId === time.id
                                  ? "var(--color-primary-100)"
                                  : "transparent",
                              cursor: isTimeBooked ? "not-allowed" : "pointer",
                              opacity: isTimeBooked ? 0.5 : 1,
                            }}
                            aria-pressed={selectedTimeId === time.id}
                          >
                            {time.startTime} ~ {time.endTime}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 하단: 확인 버튼 */}
            <div className="px-[30px] sm-mobile:px-6 pb-[21px] sm-mobile:pb-[18px] pt-10 sm-mobile:pt-10">
              <button
                type="button"
                onClick={handleConfirm}
                disabled={!selectedDate || !selectedTimeId}
                className="w-full h-[50px] rounded-md ty-16_B transition-colors"
                style={{
                  backgroundColor:
                    !selectedDate || !selectedTimeId
                      ? "var(--color-gray-300)"
                      : "var(--color-primary-500)",
                  color: "var(--color-white)",
                  cursor:
                    !selectedDate || !selectedTimeId
                      ? "not-allowed"
                      : "pointer",
                }}
                aria-label="확인"
              >
                확인
              </button>
            </div>
          </>
        )}
      </div>

      {/* 예약 완료 모달 */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        message="예약이 완료되었습니다."
      />

      {/* 에러 모달 */}
      <Modal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        message={errorMessage}
      />
    </>
  );
};

export default FixedReservationBar;
