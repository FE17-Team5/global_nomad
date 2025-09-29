// Activities 리소스 타입 정의

export type Activity = {
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

export type ActivityDetail = Activity & {
  subImages: { id: number; imageUrl: string }[];
  schedules: { id: number; date: string; startTime: string; endTime: string }[];
};

export type ActivityWithSchedules = Activity & {
  subImages: { imageUrl: string; id: number }[];
  schedules: { date: string; times: { id: number; startTime: string; endTime: string }[] }[];
};

// 요청 타입
export type ActivitiesListQuery = {
  method: "cursor" | "offset";
  cursorId?: number;
  page?: number;
  size?: number;
  category?: "문화 · 예술" | "식음료" | "스포츠" | "투어" | "관광" | "웰빙";
  keyword?: string;
  sort?: "most_reviewed" | "price_asc" | "price_desc" | "latest";
};

export type CreateActivityBody = {
  title: string;
  category: string;
  description?: string;
  address: string;
  price: number;
  schedules: { date: string; startTime: string; endTime: string }[];
  bannerImageUrl?: string;
  subImageUrls?: string[];
};

export type AvailableScheduleQuery = {
  year: string;
  month: string;
};

export type ActivityReviewsQuery = {
  page?: number;
  size?: number;
};

export type CreateReservationBody = {
  scheduleId: number;
  headCount: number;
};

// 응답 타입
export type ActivitiesListResponse = {
  cursorId: number;
  totalCount: number;
  activities: Activity[];
};

export type AvailableScheduleResponse = {
  date: string;
  times: { id: number; startTime: string; endTime: string }[];
}[];

export type ActivityReviewsResponse = {
  averageRating: number;
  totalCount: number;
  reviews: {
    id: number;
    user: { id: number; nickname: string; profileImageUrl: string };
    activityId: number;
    rating: number;
    content: string;
    createdAt: string;
    updatedAt: string;
  }[];
};

export type CreateReservationResponse = {
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

export type UploadImageResponse = {
  activityImageUrl: string;
};
