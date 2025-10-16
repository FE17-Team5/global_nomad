/**
 * NotificationModal 컴포넌트
 *
 * 알림 모달 (헤더 "알림 {count}개" + 닫기 버튼)
 * - 초기: 2개의 알림 표시
 * - 스크롤 다운: 다음 2개의 알림 로드
 * - 스크롤 업: 이전 2개의 알림 로드
 * - 스크롤 영역: 약 2개 알림 높이
 * - ESC 키로 닫기
 *
 * 사이즈:
 * - 데스크탑/태블릿: 231px 너비, 패딩 16px 8px
 * - 모바일: 327px 너비, 패딩 16px 8px
 * - 알림 아이템: 패딩 16px 20px, 간격 8px
 * - 2번째 알림(마지막)은 하단 테두리 없음
 *
 * 위치:
 * - 데스크탑(1920px): left 1373px, top 67px
 * - 태블릿(744px): left 372px, top 67px
 * - 모바일(375px): left 24px, top 62px
 */

import { useEffect, useRef, useState } from "react";
import closeIcon from "../../assets/icon/icon_delete.svg";
import { useMyNotificationsList } from "../../hooks/queries/useMyNotificationsList";
import NotificationItem from "./notification-item";

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationModal = ({ isOpen, onClose }: NotificationModalProps) => {
  const authToken = localStorage.getItem("accessToken");

  // API 데이터 가져오기
  const { data: notificationsResponse, isLoading } = useMyNotificationsList(
    {
      size: 10,
    },
    authToken,
  );

  const notifications = notificationsResponse?.notifications || [];
  const totalCount = notificationsResponse?.totalCount || 0;

  // 현재 표시 범위 관리
  const [startIndex, setStartIndex] = useState(0);
  const [displayCount, setDisplayCount] = useState(2);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastScrollTop = useRef(0);

  // 초기 데이터 로드 시 표시 범위 리셋
  useEffect(() => {
    if (isOpen) {
      setStartIndex(0);
      setDisplayCount(2);
    }
  }, [isOpen]);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      return () => document.removeEventListener("keydown", handleEsc);
    }
  }, [isOpen, onClose]);

  // 스크롤 핸들러 (양방향 무한 스크롤)
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container || isLoading) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const scrollDirection = scrollTop > lastScrollTop.current ? "down" : "up";
    lastScrollTop.current = scrollTop;

    const scrollBottom = scrollHeight - scrollTop - clientHeight;

    // 스크롤 다운: 하단에 가까워졌을 때 다음 2개 로드
    if (scrollDirection === "down" && scrollBottom < 5) {
      if (startIndex + displayCount < totalCount) {
        setDisplayCount((prev) => Math.min(prev + 2, totalCount - startIndex));
      }
    }

    // 스크롤 업: 상단에 가까워졌을 때 이전 2개 로드
    if (scrollDirection === "up" && scrollTop < 5) {
      if (startIndex > 0) {
        const newStartIndex = Math.max(0, startIndex - 2);
        const indexDiff = startIndex - newStartIndex;
        setStartIndex(newStartIndex);
        setDisplayCount((prev) => prev + indexDiff);

        // 스크롤 위치 조정 (새로 추가된 항목 높이만큼 아래로)
        requestAnimationFrame(() => {
          if (container) {
            container.scrollTop = indexDiff * 120; // 각 항목 약 120px 높이
          }
        });
      }
    }
  };

  if (!isOpen) return null;

  const displayedNotifications = notifications.slice(
    startIndex,
    startIndex + displayCount,
  );

  return (
    <div
      className="absolute z-50 bg-white rounded-lg shadow-[0px_2px_8px_0px_rgba(120,116,134,0.25)]
                 w-[20.4375rem] sm-tablet:w-[14.4375rem] sm-mobile:w-[20.4375rem]
                 top-[calc(100%+0.5rem)] right-0"
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h2 className="font-bold text-[1rem] leading-[100%] tracking-[-0.025em] text-gray-950">
          알림 {totalCount}개
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded transition-colors duration-200"
          aria-label="알림 닫기"
        >
          <img src={closeIcon} alt="" className="w-6 h-6" />
        </button>
      </div>

      {/* 스크롤 영역 */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="overflow-y-auto scrollbar-hide rounded-b-lg"
        style={{ maxHeight: "280px" }}
      >
        {isLoading && displayedNotifications.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : displayedNotifications.length > 0 ? (
          <div>
            {displayedNotifications.map((notification, index) => {
              const isLast = index === displayedNotifications.length - 1;
              return (
                <div
                  key={notification.id}
                  className={!isLast ? "border-b border-gray-100" : ""}
                >
                  <NotificationItem notification={notification} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex items-center justify-center py-8">
            <p className="ty-14_M text-gray-500">알림이 없습니다</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationModal;
