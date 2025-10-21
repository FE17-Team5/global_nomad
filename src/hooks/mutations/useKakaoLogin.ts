import { useMutation } from "@tanstack/react-query";
import type {
  OAuthSignInBody,
  OAuthSignUpBody,
  RegisterOAuthAppBody,
} from "../../lib/oauth/types";
import {
  oauthSignIn,
  oauthSignUp,
  registerOAuthApp,
} from "../../lib/oauth/api";

// 카카오 간편로그인 등록/수정
export const useKakaoRegisterOAuth = () => {
  return useMutation({
    mutationFn: (body: RegisterOAuthAppBody) => registerOAuthApp(body),
  });
};

// 카카오 간편 회원가입
export const useKakaoOAuthSignup = (provider: "google" | "kakao") => {
  return useMutation({
    mutationFn: (body: OAuthSignUpBody) => oauthSignUp(provider, body),
  });
};

// 카카오 간편 로그인
export const useKakaoOAuthLogin = (provider: "google" | "kakao") => {
  return useMutation({
    mutationFn: (body: OAuthSignInBody) => oauthSignIn(provider, body),
  });
};
