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

import { useState, useEffect, useRef } from "react";
import type { Notification } from "../../lib/my-notifications/types";
import NotificationItem from "./notification-item";
import closeIcon from "../../assets/icon/icon_delete.svg";

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationModal = ({ isOpen, onClose }: NotificationModalProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // 현재 표시 범위 관리
  const [startIndex, setStartIndex] = useState(0);
  const [displayCount, setDisplayCount] = useState(2);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastScrollTop = useRef(0);

  // Mock 데이터 (추후 API 연동 시 제거)
  const mockNotifications: Notification[] = [
    {
      id: 1,
      teamId: "team1",
      userId: 1,
      content: "함께하면 즐거운 스트릿 댄스\n(2023-01-14 15:00~18:00)\n예약이 승인되었어요.",
      createdAt: new Date(Date.now() - 60000).toISOString(), // 1분 전
      updatedAt: new Date().toISOString(),
      deletedAt: "",
    },
    {
      id: 2,
      teamId: "team1",
      userId: 1,
      content: "전통 도자기 만들기 원데이클래스\n(2023-01-15 10:00~12:00)\n예약이 거절되었어요.",
      createdAt: new Date(Date.now() - 420000).toISOString(), // 7분 전
      updatedAt: new Date().toISOString(),
      deletedAt: "",
    },
    {
      id: 3,
      teamId: "team1",
      userId: 1,
      content: "한강 자전거 투어\n(2023-01-16 14:00~16:00)\n예약이 승인되었어요.",
      createdAt: new Date(Date.now() - 3600000).toISOString(), // 1시간 전
      updatedAt: new Date().toISOString(),
      deletedAt: "",
    },
    {
      id: 4,
      teamId: "team1",
      userId: 1,
      content: "전통 차 문화 체험\n(2023-01-17 11:00~13:00)\n예약이 거절되었어요.",
      createdAt: new Date(Date.now() - 7200000).toISOString(), // 2시간 전
      updatedAt: new Date().toISOString(),
      deletedAt: "",
    },
    {
      id: 5,
      teamId: "team1",
      userId: 1,
      content: "와인 테이스팅 클래스\n(2023-01-18 18:00~20:00)\n예약이 승인되었어요.",
      createdAt: new Date(Date.now() - 86400000).toISOString(), // 1일 전
      updatedAt: new Date().toISOString(),
      deletedAt: "",
    },
    {
      id: 6,
      teamId: "team1",
      userId: 1,
      content: "제주도 올레길 트레킹\n(2023-01-19 09:00~17:00)\n예약이 승인되었어요.",
      createdAt: new Date(Date.now() - 172800000).toISOString(), // 2일 전
      updatedAt: new Date().toISOString(),
      deletedAt: "",
    },
  ];

  // 초기 데이터 로드
  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      // TODO: API 연동 시 실제 API 호출로 대체
      setTimeout(() => {
        setNotifications(mockNotifications);
        setTotalCount(mockNotifications.length);
        setStartIndex(0);
        setDisplayCount(2);
        setLoading(false);
      }, 300);
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
    if (!container || loading) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const scrollDirection = scrollTop > lastScrollTop.current ? "down" : "up";
    lastScrollTop.current = scrollTop;

    const scrollBottom = scrollHeight - scrollTop - clientHeight;

    // 스크롤 다운: 하단에 가까워졌을 때 다음 2개 로드
    if (scrollDirection === "down" && scrollBottom < 5) {
      if (startIndex + displayCount < totalCount) {
        setLoading(true);
        setTimeout(() => {
          setDisplayCount((prev) => Math.min(prev + 2, totalCount - startIndex));
          setLoading(false);
        }, 300);
      }
    }

    // 스크롤 업: 상단에 가까워졌을 때 이전 2개 로드
    if (scrollDirection === "up" && scrollTop < 5) {
      if (startIndex > 0) {
        setLoading(true);
        setTimeout(() => {
          const newStartIndex = Math.max(0, startIndex - 2);
          const indexDiff = startIndex - newStartIndex;
          setStartIndex(newStartIndex);
          setDisplayCount((prev) => prev + indexDiff);
          setLoading(false);

          // 스크롤 위치 조정 (새로 추가된 항목 높이만큼 아래로)
          requestAnimationFrame(() => {
            if (container) {
              container.scrollTop = indexDiff * 120; // 각 항목 약 120px 높이
            }
          });
        }, 300);
      }
    }
  };

  if (!isOpen) return null;

  const displayedNotifications = notifications.slice(startIndex, startIndex + displayCount);

  return (
    <div
      className="fixed z-50 bg-white rounded-lg shadow-lg border border-gray-200
                 w-[20.4375rem] sm-tablet:w-[14.4375rem] sm-mobile:w-[20.4375rem]
                 top-[3.875rem] left-[1.5rem] sm-tablet:top-[4.1875rem] sm-tablet:left-[23.25rem] sm-mobile:top-[4.1875rem] sm-mobile:left-[85.8125rem]"
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
        <h2 className="font-bold text-[1rem] leading-[100%] tracking-[-0.025em] text-gray-950">
          알림 {totalCount}개
        </h2>
        <button
          onClick={onClose}
          className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded transition-colors duration-200"
          aria-label="알림 닫기"
        >
          <img src={closeIcon} alt="" role="presentation" className="w-6 h-6" />
        </button>
      </div>

      {/* 스크롤 영역 */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="overflow-y-auto scrollbar-hide rounded-b-lg"
        style={{ maxHeight: "280px" }}
      >
        {loading && displayedNotifications.length === 0 ? (
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
                  className={!isLast ? "border-b border-gray-200" : ""}
                >
                  <NotificationItem notification={notification} />
                </div>
              );
            })}
            {loading && (
              <div className="flex items-center justify-center py-4">
                <div className="w-6 h-6 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
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
