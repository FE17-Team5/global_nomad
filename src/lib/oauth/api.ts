import { apiFetch, TEAM_ID } from "../apiClient";
import type {
  RegisterOAuthAppBody,
  RegisterOAuthAppResponse,
  OAuthSignUpBody,
  OAuthSignUpResponse,
  OAuthSignInBody,
  OAuthSignInResponse,
} from "./types";

// OAuth App 등록/수정
export async function registerOAuthApp(body: RegisterOAuthAppBody): Promise<RegisterOAuthAppResponse> {
  return apiFetch<RegisterOAuthAppResponse>(`/${TEAM_ID}/oauth/apps`, {
    method: "POST",
    body,
  });
}

// OAuth 회원가입
export async function oauthSignUp(
  provider: "google" | "kakao",
  body: OAuthSignUpBody
): Promise<OAuthSignUpResponse> {
  return apiFetch<OAuthSignUpResponse>(`/${TEAM_ID}/oauth/sign-up/${provider}`, {
    method: "POST",
    body,
  });
}

// OAuth 로그인
export async function oauthSignIn(
  provider: "google" | "kakao",
  body: OAuthSignInBody
): Promise<OAuthSignInResponse> {
  return apiFetch<OAuthSignInResponse>(`/${TEAM_ID}/oauth/sign-in/${provider}`, {
    method: "POST",
    body,
  });
}
