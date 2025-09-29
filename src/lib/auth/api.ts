import { apiFetch, TEAM_ID } from "../apiClient";
import type { LoginBody, LoginResponse, RefreshTokensResponse } from "./types";

// 로그인
export async function login(body: LoginBody): Promise<LoginResponse> {
  return apiFetch<LoginResponse>(`/${TEAM_ID}/auth/login`, {
    method: "POST",
    body,
  });
}

// 토큰 재발급
export async function refreshTokens(): Promise<RefreshTokensResponse> {
  return apiFetch<RefreshTokensResponse>(`/${TEAM_ID}/auth/tokens`, {
    method: "POST",
  });
}
