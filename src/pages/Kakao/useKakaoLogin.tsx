import { useEffect } from "react";

const useKakaoLogin = () => {
  useEffect(() => {
    if (window.Kakao?.isInitialized()) {
      return;
    }

    const script = document.createElement("script");
    script.src = `https://t1.kakaocdn.net/kakao_js_sdk/${
      import.meta.env.VITE_KAKAO_JS_SDK_VERSION
    }/kakao.min.js`;
    script.integrity = import.meta.env.VITE_INTEGRITY_VALUE;
    script.crossOrigin = "anonymous";

    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        try {
          window.Kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY);
        } catch (e) {
          console.error("Kakao SDK 초기화 실패: ", e);
        }
      }
    };

    document.body.appendChild(script);
  }, []);

  const script = document.createElement("script");
  script.src = "http";
};

export default useKakaoLogin;
