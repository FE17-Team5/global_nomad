/**
 * NotificationItem 컴포넌트
 *
 * 개별 알림 아이템 (예약 승인/거절)
 * - 기본: 흰 배경
 * - 호버: 내용 부분만 연한 파란색 배경 (`hover:bg-primary-100`)
 * - 승인: "승인" 텍스트 파란색 (`text-primary-500`)
 * - 거절: "거절" 텍스트 빨간색 (`text-red-500`)
 */

import type { Notification } from "../../lib/my-notifications/types";
import { getTimeAgo, parseNotificationStatus } from "../../utils/time-format";

interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem = ({ notification }: NotificationItemProps) => {
  const status = parseNotificationStatus(notification.content);
  const timeAgo = getTimeAgo(notification.createdAt);

  // 승인/거절에 따른 텍스트 색상 결정
  const statusColor = status === "승인" ? "text-primary-500" : "text-red-500";

  // content 파싱: "함께하면 즐거운 스트릿 댄스\n(2023-01-14 15:00~18:00)\n예약이 승인되었어요."
  const lines = notification.content.split("\n");
  const activityTitle = lines[0] || "";
  const dateTime = lines[1] || "";

  return (
    <div className="py-4 px-5 transition-colors duration-200 hover:bg-primary-100 cursor-pointer">
      {/* 헤더: 예약 승인/거절 + 시간 */}
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-bold text-[0.875rem] leading-[100%] tracking-[-0.025em] text-gray-950">
          예약 {status}
        </h3>
        <span className="font-medium text-[0.75rem] leading-[100%] tracking-[-0.025em] text-gray-400">
          {timeAgo}
        </span>
      </div>

      {/* 본문: 활동 제목 */}
      <p className="font-medium text-[0.875rem] leading-[180%] tracking-[-0.025em] text-gray-800 mb-1">
        {activityTitle}
      </p>

      {/* 날짜/시간 */}
      {dateTime && (
        <p className="font-medium text-[0.875rem] leading-[180%] tracking-[-0.025em] text-gray-800 mb-2">
          {dateTime}
        </p>
      )}

      {/* 상태 메시지 */}
      <p className="font-medium text-[0.875rem] leading-[180%] tracking-[-0.025em] text-gray-800">
        예약이 <span className={`font-bold ${statusColor}`}>{status}</span>
        되었어요.
      </p>
    </div>
  );
};

export default NotificationItem;
