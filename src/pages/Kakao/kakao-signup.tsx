import { useEffect } from "react";
import {
  useKakaoOAuthLogin,
  useKakaoOAuthSignup,
  useKakaoRegisterOAuth,
} from "../../hooks/mutations/useKakaoLogin";
import type {
  OAuthSignInResponse,
  OAuthSignUpResponse,
} from "../../lib/oauth/types";
import { useNavigate, useSearchParams } from "react-router-dom";

const KakaoSignup = () => {
  const navigate = useNavigate();
  const [searchParams, setSerchParams] = useSearchParams();

  const accessCode = searchParams.get("code");

  const registerOAuthMutation = useKakaoRegisterOAuth();
  const signinOAuthMutation = useKakaoOAuthLogin("kakao");
  const signupOAuthMutation = useKakaoOAuthSignup("kakao");

  useEffect(() => {
    registerOAuthMutation.mutate(
      {
        appKey: import.meta.env.VITE_KAKAO_REST_API_KEY,
        provider: "kakao",
      },
      {
        onSuccess: () => {
          signupOAuthMutation.mutate(
            {
              nickname: "사용자",
              redirectUri: import.meta.env.VITE_KAKAO_SIGNUP_REDIRECT_URI,
              token: accessCode!,
            },
            {
              onSuccess: (data: OAuthSignUpResponse) => {
                localStorage.setItem("accessToken", data.accessToken);
                localStorage.setItem("refreshToken", data.refreshToken);
                localStorage.setItem("myProfileTab", "0");

                signinOAuthMutation.mutate(
                  {
                    redirectUri: import.meta.env.VITE_KAKAO_SIGNUP_REDIRECT_URI,
                    token: accessCode!,
                  },

                  {
                    onSuccess: (data: OAuthSignInResponse) => {
                      localStorage.setItem("accessToken", data.accessToken);
                      localStorage.setItem("refreshToken", data.refreshToken);
                      localStorage.setItem("myProfileTab", "0");
                      navigate("/");
                    },
                  }
                );
              },
              onError: (error) => {
                alert(error.message);
                navigate("/login");
              },
            }
          );
        },
        onError: (error) => {
          console.error(error);
        },
      }
    );
  }, [
    navigate,
    registerOAuthMutation.mutate,
    signinOAuthMutation.mutate,
    signupOAuthMutation.mutate,
    accessCode,
  ]);

  return <div>카카오 회원가입중...</div>;
};

export default KakaoSignup;
