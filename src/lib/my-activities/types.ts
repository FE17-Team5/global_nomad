// My Activities 리소스 타입 정의

export type MyActivity = {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
};

export type MyActivityWithSchedules = MyActivity & {
  subImages: { imageUrl: string; id: number }[];
  schedules: {
    date: string;
    times: { id: number; startTime: string; endTime: string }[];
  }[];
};

// 요청 타입
export type MyActivitiesListQuery = {
  cursorId?: number;
  size?: number;
};

export type ReservationDashboardQuery = {
  year: string;
  month: string;
};

export type ReservedScheduleQuery = {
  date: string;
};

export type ActivityReservationsQuery = {
  cursorId?: number;
  size?: number;
  scheduleId: number;
  status: "declined" | "pending" | "confirmed";
};

export type UpdateReservationStatusBody = {
  status: "pending" | "confirmed" | "declined";
};

export type UpdateMyActivityBody = {
  title?: string;
  category?: string;
  description?: string;
  price?: number;
  address?: string;
  bannerImageUrl?: string;
  subImageIdsToRemove?: number[];
  subImageUrlsToAdd?: string[];
  scheduleIdsToRemove?: number[];
  schedulesToAdd?: { date: string; startTime: string; endTime: string }[];
};

// 응답 타입
export type MyActivitiesListResponse = {
  cursorId: number;
  totalCount: number;
  activities: MyActivity[];
};

export type ReservationDashboardResponse = {
  date: string;
  reservations: {
    completed: number;
    confirmed: number;
    pending: number;
  };
}[];

export type ReservedScheduleResponse = {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: {
    declined: number;
    confirmed: number;
    pending: number;
  };
}[];

export type ActivityReservationsResponse = {
  cursorId: number;
  totalCount: number;
  reservations: {
    id: number;
    nickname: string;
    userId: number;
    teamId: string;
    activityId: number;
    scheduleId: number;
    status: string;
    reviewSubmitted: boolean;
    totalPrice: number;
    headCount: number;
    date: string;
    startTime: string;
    endTime: string;
    createdAt: string;
    updatedAt: string;
  }[];
};

export type UpdateReservationStatusResponse = {
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
