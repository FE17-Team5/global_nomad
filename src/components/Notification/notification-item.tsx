/**
 * NotificationItem 컴포넌트
 *
 * 개별 알림 아이템 (예약 승인/거절)
 * - 기본: 흰 배경
 * - 호버: 내용 부분만 연한 파란색 배경 (`hover:bg-primary-100`)
 * - 승인: "승인" 텍스트 파란색 (`text-primary-500`)
 * - 거절: "거절" 텍스트 빨간색 (`text-red-500`)
 * - 우클릭: 컨텍스트 메뉴 (삭제하기)
 */

import { useState } from "react";
import type { Notification } from "../../lib/my-notifications/types";
import { getTimeAgo, parseNotificationStatus } from "../../utils/time-format";
import NotificationContextMenu from "./notification-context-menu";
import ConfirmModal from "../Modal/confirm-modal";
import { useDeleteMyNotification } from "../../hooks/mutations/useDeleteMyNotification";

interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem = ({ notification }: NotificationItemProps) => {
  const authToken = localStorage.getItem("accessToken");
  const deleteMutation = useDeleteMyNotification(authToken || "");

  const status = parseNotificationStatus(notification.content);
  const timeAgo = getTimeAgo(notification.createdAt);

  // 컨텍스트 메뉴 상태
  const [contextMenu, setContextMenu] = useState<{
    isOpen: boolean;
    x: number;
    y: number;
  }>({
    isOpen: false,
    x: 0,
    y: 0,
  });

  // 삭제 확인 모달 상태
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // 승인/거절에 따른 텍스트 색상 결정
  const statusColor = status === "승인" ? "text-primary-500" : "text-red-500";

  // 우클릭 핸들러
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      isOpen: true,
      x: e.clientX,
      y: e.clientY,
    });
  };

  // 컨텍스트 메뉴 닫기
  const handleCloseContextMenu = () => {
    setContextMenu({ isOpen: false, x: 0, y: 0 });
  };

  // 삭제 모달 열기
  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  // 삭제 확인
  const handleConfirmDelete = () => {
    deleteMutation.mutate(notification.id);
    setIsDeleteModalOpen(false);
  };

  // content 파싱
  // 예시: "ssss(2025-10-25 00:30~01:00)예약이 승인되었어요."
  // 또는: "함께하면 즐거운 스트릿 댄스\n(2023-01-14 15:00~18:00)\n예약이 승인되었어요."

  let activityTitle = "";
  let dateTime = "";

  // 정규식으로 제목과 날짜/시간 추출
  // 패턴: 제목(날짜 시간~시간)...
  const match = notification.content.match(/^(.+?)\((\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}~\d{2}:\d{2})\)/);

  if (match) {
    activityTitle = match[1].trim(); // 제목
    dateTime = match[2]; // 날짜/시간 (괄호 제거됨)
  } else {
    // 줄바꿈 기반 파싱 (이전 방식)
    const lines = notification.content.split("\n");
    activityTitle = lines[0] || "";
    const dateTimeLine = lines[1] || "";
    dateTime = dateTimeLine.replace(/[()]/g, ""); // 괄호 제거
  }

  // 제목 길이 제한 함수 (20자 초과 시 말줄임표)
  const truncateTitle = (title: string, maxLength = 20) => {
    if (title.length <= maxLength) return title;
    return `${title.slice(0, maxLength)}...`;
  };

  return (
    <>
      <div
        className="py-4 px-5 transition-colors duration-200 hover:bg-primary-100 cursor-pointer"
        onContextMenu={handleContextMenu}
      >
        {/* 헤더: 체험 제목 (말줄임) + 시간 */}
        <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-bold text-[0.875rem] leading-[1.2] tracking-[-0.025em] text-gray-950 flex-1 overflow-hidden text-ellipsis">
          {truncateTitle(activityTitle)}
        </h3>
        <span className="font-medium text-[0.75rem] leading-[100%] tracking-[-0.025em] text-gray-400 whitespace-nowrap">
          {timeAgo}
        </span>
      </div>

      {/* 본문: 예약 날짜/시간 */}
      {dateTime && (
        <p className="font-medium text-[0.875rem] leading-[180%] tracking-[-0.025em] text-gray-800 mb-1">
          <span className="text-gray-600">예약 일정:</span> {dateTime}
        </p>
      )}

      {/* 상태 메시지: 체험 예약이 승인되었습니다 */}
      <p className="font-medium text-[0.875rem] leading-[180%] tracking-[-0.025em] text-gray-800">
        체험 예약이 <span className={`font-bold ${statusColor}`}>{status}</span>
        되었습니다.
      </p>
      </div>

      {/* 컨텍스트 메뉴 */}
      <NotificationContextMenu
        isOpen={contextMenu.isOpen}
        position={{ x: contextMenu.x, y: contextMenu.y }}
        onClose={handleCloseContextMenu}
        onDelete={handleOpenDeleteModal}
      />

      {/* 삭제 확인 모달 */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message="이 알림을 삭제하시겠습니까?"
        confirmText="삭제하기"
      />
    </>
  );
};

export default NotificationItem;
