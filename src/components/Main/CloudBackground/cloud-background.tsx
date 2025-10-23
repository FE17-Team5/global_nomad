/**
 * 구름 배경 컴포넌트
 *
 * 메인 페이지 배경에 떠다니는 구름 아이콘 애니메이션
 * - SVG 구름 아이콘을 사용한 배경 효과
 * - CSS 애니메이션을 통한 부드러운 흐름 효과
 * - 여러 속도와 위치로 자연스러운 움직임 구현
 */

import CloudIcon from "../../../assets/icon/icon_cloud.svg?react";

const CloudBackground = () => {
  // 구름 설정 배열 (위치, 크기, 애니메이션 속도)
  // 여러 구름이 겹쳐 보이도록 다양한 시작 위치와 delay 설정
  const clouds = [
    // 첫 번째 레이어 - 상단
    { top: "5%", left: "-10%", scale: 1, duration: 45, delay: 0 },
    { top: "8%", left: "20%", scale: 0.85, duration: 50, delay: 0 },
    { top: "12%", left: "60%", scale: 0.95, duration: 48, delay: 0 },

    // 두 번째 레이어 - 중상단
    { top: "18%", left: "-15%", scale: 0.8, duration: 52, delay: 8 },
    { top: "22%", left: "35%", scale: 1.1, duration: 47, delay: 8 },
    { top: "25%", left: "75%", scale: 0.9, duration: 53, delay: 8 },

    // 세 번째 레이어 - 중앙
    { top: "35%", left: "-8%", scale: 1.2, duration: 55, delay: 16 },
    { top: "38%", left: "25%", scale: 0.88, duration: 49, delay: 16 },
    { top: "42%", left: "55%", scale: 1.05, duration: 51, delay: 16 },

    // 네 번째 레이어 - 중하단
    { top: "52%", left: "-12%", scale: 0.92, duration: 48, delay: 24 },
    { top: "55%", left: "40%", scale: 1.15, duration: 54, delay: 24 },
    { top: "58%", left: "80%", scale: 0.78, duration: 46, delay: 24 },

    // 다섯 번째 레이어 - 하단
    { top: "68%", left: "-14%", scale: 1.08, duration: 50, delay: 32 },
    { top: "72%", left: "30%", scale: 0.95, duration: 52, delay: 32 },
    { top: "75%", left: "65%", scale: 1.0, duration: 47, delay: 32 },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {clouds.map((cloud, index) => (
        <div
          key={index}
          className="absolute animate-float-cloud"
          style={{
            top: cloud.top,
            left: cloud.left,
            transform: `scale(${cloud.scale})`,
            animationDuration: `${cloud.duration}s`,
            animationDelay: `${cloud.delay}s`,
          }}
        >
          <CloudIcon className="w-[138px] h-[53px] opacity-80" />
        </div>
      ))}

      <style>{`
        @keyframes float-cloud {
          0% {
            transform: translateX(0) translateY(0) scale(var(--scale));
          }
          50% {
            transform: translateX(calc(50vw + 100px)) translateY(-20px) scale(var(--scale));
          }
          100% {
            transform: translateX(calc(100vw + 200px)) translateY(0) scale(var(--scale));
          }
        }

        .animate-float-cloud {
          --scale: 1;
          animation: float-cloud linear infinite;
        }
      `}</style>
    </div>
  );
};

export default CloudBackground;
