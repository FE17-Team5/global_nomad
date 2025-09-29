// OAuth 리소스 타입 정의

export type User = {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
};

// 요청 타입
export type RegisterOAuthAppBody = {
  appKey: string;
  provider: "google" | "kakao";
};

export type OAuthSignUpBody = {
  nickname: string;
  redirectUri: string;
  token: string;
};

export type OAuthSignInBody = {
  redirectUri: string;
  token: string;
};

// 응답 타입
export type RegisterOAuthAppResponse = {
  id: number;
  teamId: string;
  provider: string;
  appKey: string;
  createdAt: string;
  updatedAt: string;
};

export type OAuthSignUpResponse = {
  user: User;
  refreshToken: string;
  accessToken: string;
};

export type OAuthSignInResponse = {
  user: User;
  refreshToken: string;
  accessToken: string;
};
