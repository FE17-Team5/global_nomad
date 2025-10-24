/**
 * NotificationModal 컴포넌트
 *
 * 알림 모달 (헤더 "알림 {count}개" + 닫기 버튼)
 * - 모든 알림 표시 (일반 스크롤)
 * - ESC 키로 닫기
 *
 * 사이즈:
 * - 데스크탑/태블릿: 231px 너비
 * - 모바일: 327px 너비
 * - 스크롤 영역: 약 2.5개 알림 높이 (370px)
 *
 * 위치:
 * - 데스크탑(1920px): left 1373px, top 67px
 * - 태블릿(744px): left 372px, top 67px
 * - 모바일(375px): left 24px, top 62px
 */

import { useEffect, useRef } from "react";
import closeIcon from "../../assets/icon/icon_delete.svg";
import { useMyNotificationsList } from "../../hooks/queries/useMyNotificationsList";
import NotificationItem from "./notification-item";

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationModal = ({ isOpen, onClose }: NotificationModalProps) => {
  const authToken = localStorage.getItem("accessToken");
  const modalRef = useRef<HTMLDivElement>(null);

  // API 데이터 가져오기 - 모든 알림 로드
  const { data: notificationsResponse, isLoading } = useMyNotificationsList(
    {
      size: 100, // 충분한 크기로 모든 알림 가져오기
    },
    authToken,
  );

  const notifications = notificationsResponse?.notifications || [];
  const totalCount = notificationsResponse?.totalCount || 0;

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      // 약간의 지연을 두어 모달이 열리는 클릭 이벤트와 분리
      setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 0);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, onClose]);

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

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="absolute z-50 bg-white rounded-lg shadow-[0px_2px_8px_0px_rgba(120,116,134,0.25)]
                 w-[20.4375rem] sm-tablet:w-[14.4375rem] sm-mobile:w-[20.4375rem]
                 top-[calc(100%+0.5rem)]"
      style={{ right: "-2px" }}
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
        className="overflow-y-scroll scrollbar-hide rounded-b-lg snap-y snap-mandatory"
        style={{ maxHeight: "336px" }}
      >
        {isLoading && notifications.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : notifications.length > 0 ? (
          <div>
            {notifications.map((notification, index) => {
              const isLast = index === notifications.length - 1;
              return (
                <div
                  key={notification.id}
                  className={`snap-start ${!isLast ? "border-b border-gray-100" : ""}`}
                >
                  <NotificationItem notification={notification} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex items-center justify-center py-8">
            <p className="font-medium text-[0.875rem] text-gray-500">
              알림이 없습니다
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationModal;
