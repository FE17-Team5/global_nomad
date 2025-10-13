/**
 * 시간 포맷 유틸리티
 * ISO 시간 문자열을 "N분 전", "N시간 전", "N일 전" 형식으로 변환
 */

export function getTimeAgo(isoString: string): string {
  const now = new Date();
  const createdAt = new Date(isoString);
  const diffInSeconds = Math.floor((now.getTime() - createdAt.getTime()) / 1000);

  // 1분 미만
  if (diffInSeconds < 60) {
    return "방금 전";
  }

  // 1시간 미만
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  }

  // 1일 미만
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  }

  // 30일 미만
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays}일 전`;
  }

  // 1년 미만
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths}개월 전`;
  }

  // 1년 이상
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears}년 전`;
}

/**
 * 알림 content 파싱하여 상태 추출
 * "예약이 승인되었어요" → "승인"
 * "예약이 거절되었어요" → "거절"
 */
export function parseNotificationStatus(content: string): "승인" | "거절" | null {
  if (content.includes("승인")) {
    return "승인";
  }
  if (content.includes("거절")) {
    return "거절";
  }
  return null;
}
