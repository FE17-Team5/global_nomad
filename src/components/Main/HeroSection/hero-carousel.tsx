/**
 * 히어로 캐러셀 컴포넌트
 *
 * 다양한 기준의 체험을 자동 회전하며 보여주는 캐러셀
 * - 4가지 정렬 기준: 인기, 최신, 가성비, 프리미엄
 * - 3초 자동 슬라이드 (호버 시 일시정지)
 * - 선형 인디케이터와 화살표 네비게이션
 * - 슬라이드 전환 애니메이션
 */

import { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { useActivitiesList } from "../../../hooks/queries/useActivitiesList";
import heroImage from "../../../assets/img/image2.png";

// 슬라이드 설정 타입
type SlideConfig = {
  sort: "most_reviewed" | "latest" | "price_asc" | "price_desc";
  title: string;
  subtitle: string;
  emoji: string;
};

// 4가지 슬라이드 설정
const SLIDE_CONFIGS: SlideConfig[] = [
  {
    sort: "most_reviewed",
    title: "이달의 인기 체험",
    subtitle: "BEST",
    emoji: "🔥",
  },
  {
    sort: "latest",
    title: "따끈따끈한 신규 체험",
    subtitle: "NEW",
    emoji: "🆕",
  },
  {
    sort: "price_asc",
    title: "가격 착한 가성비 체험",
    subtitle: "BUDGET",
    emoji: "💸",
  },
  {
    sort: "price_desc",
    title: "럭셔리 프리미엄 체험",
    subtitle: "PREMIUM",
    emoji: "✨",
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [previousSlide, setPreviousSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 현재 월 계산
  const currentMonth = useMemo(() => {
    const month = new Date().getMonth() + 1;
    return `${month}월`;
  }, []);

  // 각 슬라이드별 데이터 가져오기
  const slide1 = useActivitiesList({
    method: "offset",
    page: 1,
    size: 100,
    sort: "most_reviewed",
  });

  const slide2 = useActivitiesList({
    method: "offset",
    page: 1,
    size: 100,
    sort: "latest",
  });

  const slide3 = useActivitiesList({
    method: "offset",
    page: 1,
    size: 100,
    sort: "price_asc",
  });

  const slide4 = useActivitiesList({
    method: "offset",
    page: 1,
    size: 100,
    sort: "price_desc",
  });

  const slides = [slide1, slide2, slide3, slide4];

  // 각 슬라이드의 최상위 체험 선택
  const topActivities = useMemo(() => {
    return slides.map((slide, index) => {
      if (!slide.data?.activities || slide.data.activities.length === 0) {
        return null;
      }

      const activities = slide.data.activities;

      // 인기 체험은 평점 높은 순으로 정렬
      if (index === 0) {
        const sorted = [...activities].sort((a, b) => {
          if (b.rating !== a.rating) {
            return b.rating - a.rating;
          }
          return b.reviewCount - a.reviewCount;
        });
        return sorted[0];
      }

      // 나머지는 첫 번째 항목 사용
      return activities[0];
    });
  }, [slide1.data, slide2.data, slide3.data, slide4.data]);

  // 자동 슬라이드 (5초)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setDirection("right");
      setPreviousSlide(currentSlide);
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev + 1) % SLIDE_CONFIGS.length);

      // 애니메이션 완료 후 전환 상태 해제
      setTimeout(() => setIsTransitioning(false), 500);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, currentSlide]);

  // 다음/이전 슬라이드 핸들러
  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    setDirection("right");
    setPreviousSlide(currentSlide);
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % SLIDE_CONFIGS.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [currentSlide, isTransitioning]);

  const handlePrev = useCallback(() => {
    if (isTransitioning) return;
    setDirection("left");
    setPreviousSlide(currentSlide);
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + SLIDE_CONFIGS.length) % SLIDE_CONFIGS.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [currentSlide, isTransitioning]);

  // 특정 슬라이드로 이동
  const handleSlideChange = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentSlide) return;
      setDirection(index > currentSlide ? "right" : "left");
      setPreviousSlide(currentSlide);
      setIsTransitioning(true);
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 500);
    },
    [currentSlide, isTransitioning]
  );

  // 현재 및 이전 슬라이드 정보
  const currentConfig = SLIDE_CONFIGS[currentSlide];
  const currentActivity = topActivities[currentSlide];
  const activityTitle = currentActivity?.title || "함께 배우고 즐기는 스트릿 댄스";
  const activityImage = currentActivity?.bannerImageUrl || heroImage;
  const activityId = currentActivity?.id;

  const previousActivity = topActivities[previousSlide];
  const previousActivityImage = previousActivity?.bannerImageUrl || heroImage;

  return (
    <section
      className="w-full bg-transparent"
      style={{
        paddingTop: "clamp(4.625rem, 15vw, 6.4375rem)",
      }}
    >
      <div className="flex justify-center px-[2.5rem] sm-tablet:px-[1.875rem] sm-mobile:px-6">
        <div className="w-[75rem] sm-tablet:w-[46.5rem] sm-mobile:w-[29.125rem] px-0 sm-tablet:px-0 sm-mobile:px-0">
          {/* 히어로 이미지 컨테이너 */}
          <div
            className="relative group"
            onMouseEnter={() => {
              setIsPaused(true);
              setIsHovered(true);
            }}
            onMouseLeave={() => {
              setIsPaused(false);
              setIsHovered(false);
            }}
          >
            <Link
              to={activityId ? `/detail/${activityId}` : "#"}
              className="relative w-full h-[31.25rem] sm-tablet:h-[23.4375rem] sm-mobile:h-[11.3125rem] rounded-[1.5rem] sm-tablet:rounded-[1.125rem] sm-mobile:rounded-[0.75rem] overflow-hidden shadow-card hover:shadow-lg transition-shadow duration-200 block cursor-pointer"
            >
              {/* 이전 이미지 - 슬라이드 아웃 */}
              {isTransitioning && (
                <div
                  className={`absolute inset-0 z-0 ${
                    direction === "right" ? "animate-slide-out-left" : "animate-slide-out-right"
                  }`}
                >
                  <img
                    src={previousActivityImage}
                    alt=""
                    role="presentation"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* 현재 이미지 - 슬라이드 인 */}
              <div
                className={`absolute inset-0 z-10 ${
                  isTransitioning
                    ? direction === "right"
                      ? "animate-slide-in-right"
                      : "animate-slide-in-left"
                    : ""
                }`}
              >
                <img
                  src={activityImage}
                  alt=""
                  role="presentation"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 어두운 오버레이 */}
              <div className="absolute inset-0 bg-black/40 z-20" />

              {/* 컨텐츠 - 데스크탑 */}
              <div
                className={`absolute inset-0 sm-tablet:hidden sm-mobile:hidden z-30 ${
                  isTransitioning ? "animate-fade-in" : ""
                }`}
                key={`content-desktop-${currentSlide}`}
              >
                {/* 메인 제목 - 데스크탑 */}
                <h1
                  className="ty-32_B text-white text-center absolute left-1/2 -translate-x-1/2 whitespace-nowrap"
                  style={{ top: "321px" }}
                >
                  {activityTitle}
                </h1>

                {/* 부제목 - 데스크탑 */}
                <p
                  className="ty-18_M text-white/90 flex items-center justify-center gap-1 absolute left-1/2 -translate-x-1/2 whitespace-nowrap"
                  style={{ top: "378px" }}
                >
                  {currentMonth}의 {currentConfig.title} {currentConfig.subtitle}
                  <span aria-label={currentConfig.title}>{currentConfig.emoji}</span>
                </p>
              </div>

              {/* 컨텐츠 - 태블릿 */}
              <div
                className={`absolute inset-0 hidden sm-tablet:block sm-mobile:hidden z-30 ${
                  isTransitioning ? "animate-fade-in" : ""
                }`}
                key={`content-tablet-${currentSlide}`}
              >
                {/* 메인 제목 - 태블릿 */}
                <h1
                  className="ty-24_B text-white text-center absolute left-1/2 -translate-x-1/2 whitespace-nowrap"
                  style={{ top: "240.75px" }}
                >
                  {activityTitle}
                </h1>

                {/* 부제목 - 태블릿 */}
                <p
                  className="ty-16_M text-white/90 flex items-center justify-center gap-1 absolute left-1/2 -translate-x-1/2 whitespace-nowrap"
                  style={{ top: "283.5px" }}
                >
                  {currentMonth}의 {currentConfig.title} {currentConfig.subtitle}
                  <span aria-label={currentConfig.title}>{currentConfig.emoji}</span>
                </p>
              </div>

              {/* 컨텐츠 - 모바일 */}
              <div
                className={`absolute inset-0 hidden sm-mobile:block z-30 ${
                  isTransitioning ? "animate-fade-in" : ""
                }`}
                key={`content-mobile-${currentSlide}`}
              >
                {/* 메인 제목 - 모바일 */}
                <h1
                  className="ty-18_B text-white text-center absolute left-1/2 -translate-x-1/2 whitespace-nowrap"
                  style={{ top: "99px" }}
                >
                  {activityTitle}
                </h1>

                {/* 부제목 - 모바일 */}
                <p
                  className="ty-14_M text-white/90 flex items-center justify-center gap-1 absolute left-1/2 -translate-x-1/2 whitespace-nowrap"
                  style={{ top: "128px" }}
                >
                  {currentMonth}의 {currentConfig.title} {currentConfig.subtitle}
                  <span aria-label={currentConfig.title}>{currentConfig.emoji}</span>
                </p>
              </div>
            </Link>

            {/* 화살표 네비게이션 - 호버 시에만 표시 */}
            <button
              onClick={handlePrev}
              className={`absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all duration-300 sm-tablet:hidden sm-mobile:hidden z-30 ${
                isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"
              }`}
              aria-label="이전 슬라이드"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 18L9 12L15 6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              onClick={handleNext}
              className={`absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all duration-300 sm-tablet:hidden sm-mobile:hidden z-30 ${
                isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
              }`}
              aria-label="다음 슬라이드"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 18L15 12L9 6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* 선형 인디케이터 */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 sm-mobile:bottom-3 z-30">
              {SLIDE_CONFIGS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleSlideChange(index)}
                  className="relative h-1 transition-all duration-300"
                  style={{
                    width: currentSlide === index ? "48px" : "24px",
                  }}
                  aria-label={`슬라이드 ${index + 1}로 이동`}
                >
                  <div
                    className={`absolute inset-0 rounded-full transition-all duration-300 ${
                      currentSlide === index ? "bg-white" : "bg-white/40 hover:bg-white/60"
                    }`}
                  />
                  {/* 진행 바 */}
                  {currentSlide === index && !isPaused && (
                    <div
                      className="absolute inset-0 bg-white rounded-full origin-left"
                      style={{
                        animation: "progress 5s linear",
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes progress {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes slide-in-left {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes slide-out-left {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }

        @keyframes slide-out-right {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(100%);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.5s ease-in-out;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.5s ease-in-out;
        }

        .animate-slide-out-left {
          animation: slide-out-left 0.5s ease-in-out;
        }

        .animate-slide-out-right {
          animation: slide-out-right 0.5s ease-in-out;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }
      `}</style>
    </section>
  );
};

export default HeroCarousel;
