// Users 리소스 타입 정의

export type User = {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
};

// 요청 타입
export type SignUpBody = {
  email: string;
  nickname: string;
  password: string;
};

export type UpdateMyProfileBody = {
  nickname?: string;
  profileImageUrl?: string;
  newPassword?: string;
};

// 응답 타입
export type SignUpResponse = User;

export type UploadProfileImageResponse = {
  profileImageUrl: string;
};
