// Auth 리소스 타입 정의

export type LoginBody = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user: {
    id: number;
    email: string;
    nickname: string;
    profileImageUrl: string;
    createdAt: string;
    updatedAt: string;
  };
  refreshToken: string;
  accessToken: string;
};

export type RefreshTokensResponse = {
  refreshToken: string;
  accessToken: string;
};
