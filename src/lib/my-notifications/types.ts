// My Notifications 리소스 타입 정의

export type Notification = {
  id: number;
  teamId: string;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

// 요청 타입
export type MyNotificationsListQuery = {
  cursorId?: number;
  size?: number;
};

// 응답 타입
export type MyNotificationsListResponse = {
  cursorId: number;
  notifications: Notification[];
  totalCount: number;
};
