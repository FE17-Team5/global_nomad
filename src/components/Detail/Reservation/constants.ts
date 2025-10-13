/**
 * 예약 UI 관련 상수
 */

// 브레이크포인트 상수 (px)
export const BREAKPOINTS = {
  MOBILE: 375,
  TABLET: 744,
  DESKTOP: 1200,
} as const;

// UI 크기 상수
export const RESERVATION_UI_HEIGHTS = {
  COLLAPSED: 124, // 축소 상태 높이 (px)
  EXPANDED: 680, // 확장 상태 높이 (px) - line-height: normal 고려
  CALENDAR_CONTAINER: 492, // 캘린더 컨테이너 높이 (px)
} as const;

// Footer 높이 상수 (px)
export const FOOTER_HEIGHTS = {
  DESKTOP: 140,
  MOBILE: 116,
} as const;

// Border Radius 상수
export const BORDER_RADIUS = {
  SMALL: "4px",
  MEDIUM: "8px",
  LARGE: "16px",
  XLARGE: "24px",
} as const;
