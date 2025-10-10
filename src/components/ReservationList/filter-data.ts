import type { components } from "../../types/api-types";

export interface FilterListType {
  status: components["schemas"]["ReservationStatus"];
  title: string;
  badgeBg: string;
  badgeTextColor: string;
}

export const filterList: FilterListType[] = [
  {
    status: "pending",
    title: "예약 완료",
    badgeBg: "bg-green-100",
    badgeTextColor: "text-green-500",
  },
  {
    status: "canceled",
    title: "예약 취소",
    badgeBg: "bg-gray-100",
    badgeTextColor: "text-gray-600",
  },
  {
    status: "confirmed",
    title: "예약 승인",
    badgeBg: "bg-cyan-100",
    badgeTextColor: "text-cyan-500",
  },
  {
    status: "declined",
    title: "예약 거절",
    badgeBg: "bg-red-100",
    badgeTextColor: "text-red-500",
  },
  {
    status: "completed",
    title: "체험 완료",
    badgeBg: "bg-blue-100",
    badgeTextColor: "text-blue-500",
  },
];
