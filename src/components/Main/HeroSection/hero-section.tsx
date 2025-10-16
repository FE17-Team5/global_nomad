/**
 * 히어로 섹션 컴포넌트
 *
 * 메인 페이지 상단의 배너 섹션
 * - 이달의 인기 체험 표시
 * - 리뷰가 가장 많은 체험의 배너 이미지와 정보 표시
 * - 반응형: 데스크탑, 태블릿, 모바일 별도 레이아웃
 */

import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useActivitiesList } from "../../../hooks/queries/useActivitiesList";
import heroImage from "../../../assets/img/image2.png";

const HeroSection = () => {
  // 리뷰 많은 순으로 체험 데이터 가져오기
  const { data: response } = useActivitiesList({
    method: "offset",
    page: 1,
    size: 100,
    sort: "most_reviewed",
  });

  // 가장 높은 평점의 체험 찾기 (평점 → 리뷰 수 순)
  const topActivity = useMemo(() => {
    if (!response?.activities || response.activities.length === 0) {
      return null;
    }

    // 평점 높은 순, 그 다음 리뷰 많은 순으로 정렬
    const sorted = [...response.activities].sort((a, b) => {
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }
      return b.reviewCount - a.reviewCount;
    });

    return sorted[0];
  }, [response]);

  // 현재 월을 한글로 가져오기
  const currentMonth = useMemo(() => {
    const month = new Date().getMonth() + 1;
    return `${month}월`;
  }, []);

  // 상위 체험 데이터 또는 기본값 사용
  const activityTitle = topActivity?.title || "함께 배우고 즐기는 스트릿 댄스";
  const activityImage = topActivity?.bannerImageUrl || heroImage;

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
          <Link
            to={topActivity ? `/detail/${topActivity.id}` : "#"}
            className="relative w-full h-[31.25rem] sm-tablet:h-[23.4375rem] sm-mobile:h-[11.3125rem] rounded-[1.5rem] sm-tablet:rounded-[1.125rem] sm-mobile:rounded-[0.75rem] overflow-hidden shadow-card hover:shadow-lg transition-shadow duration-200 block cursor-pointer"
          >
            {/* 배경 이미지 */}
            <img
              src={activityImage}
              alt=""
              role="presentation"
              className="w-full h-full object-cover"
            />
            {/* 어두운 오버레이 */}
            <div className="absolute inset-0 bg-black/40" />

            {/* 컨텐츠 - 데스크탑 */}
            <div className="absolute inset-0 sm-tablet:hidden sm-mobile:hidden">
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
                {currentMonth}의 인기 체험 BEST
                <span aria-label="불꽃">
                  🔥
                </span>
              </p>
            </div>

            {/* 컨텐츠 - 태블릿 */}
            <div className="absolute inset-0 hidden sm-tablet:block sm-mobile:hidden">
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
                {currentMonth}의 인기 체험 BEST
                <span aria-label="불꽃">
                  🔥
                </span>
              </p>
            </div>

            {/* 컨텐츠 - 모바일 */}
            <div className="absolute inset-0 hidden sm-mobile:block">
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
                {currentMonth}의 인기 체험 BEST
                <span aria-label="불꽃">
                  🔥
                </span>
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
