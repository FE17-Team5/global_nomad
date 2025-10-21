import { useEffect } from "react";
import {
  useKakaoOAuthLogin,
  useKakaoRegisterOAuth,
} from "../../hooks/mutations/useKakaoLogin";
import type { OAuthSignInResponse } from "../../lib/oauth/types";
import { useNavigate, useSearchParams } from "react-router-dom";

const KakaoLogin = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const accessCode = searchParams.get("code");

  const registerOAuthMutation = useKakaoRegisterOAuth();
  const signinOAuthMutation = useKakaoOAuthLogin("kakao");

  useEffect(() => {
    registerOAuthMutation.mutate(
      {
        appKey: import.meta.env.VITE_KAKAO_REST_API_KEY,
        provider: "kakao",
      },
      {
        onSuccess: () => {
          signinOAuthMutation.mutate(
            {
              redirectUri: import.meta.env.VITE_KAKAO_LOGIN_REDIRECT_URI,
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
          navigate("/signup");
        },
      }
    );
  }, [
    navigate,
    registerOAuthMutation.mutate,
    signinOAuthMutation.mutate,
    accessCode,
  ]);

  return <div>카카오 로그인중...</div>;
};

export default KakaoLogin;
