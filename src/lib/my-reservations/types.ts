// My Reservations 리소스 타입 정의

export type MyReservation = {
  id: number;
  teamId: string;
  userId: number;
  activity: { id: number; title: string; bannerImageUrl: string };
  scheduleId: number;
  status: "pending" | "confirmed" | "declined" | "canceled" | "completed";
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
};

// 요청 타입
export type MyReservationsListQuery = {
  cursorId?: number;
  size?: number;
  status?: "pending" | "confirmed" | "declined" | "canceled" | "completed";
};

export type CancelMyReservationBody = {
  status: "canceled";
};

export type CreateReservationReviewBody = {
  rating: number;
  content: string;
};

// 응답 타입
export type MyReservationsListResponse = {
  cursorId: number;
  reservations: MyReservation[];
  totalCount: number;
};

export type CancelMyReservationResponse = {
  id: number;
  teamId: string;
  userId: number;
  activityId: number;
  scheduleId: number;
  status: "pending" | "confirmed" | "declined" | "canceled" | "completed";
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateReservationReviewResponse = {
  id: number;
  teamId: string;
  activityId: number;
  userId: number;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
};
