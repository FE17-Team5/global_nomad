import { useEffect, useRef, useState, useMemo } from "react";
import { useActivitiesList } from "../../../hooks/queries/useActivitiesList";
import { matchKoreanSearch } from "../../../utils/korean-search";
import ActivityCard from "./activity-card";

interface PopularActivitiesProps {
  searchKeyword?: string;
}

const PopularActivities = ({ searchKeyword = "" }: PopularActivitiesProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const _scrollContainerRef = useRef<HTMLDivElement>(null);

  const { data: response, isLoading: loading } = useActivitiesList({
    method: "offset",
    page: 1,
    size: 100,
    sort: "most_reviewed",
  });

  const allActivities = response?.activities || [];

  // 클라이언트 사이드에서 한글 초성 검색 필터링 (인기순 유지)
  const activities = useMemo(() => {
    if (!searchKeyword || !searchKeyword.trim()) {
      return allActivities.slice(0, 10); // 검색어 없으면 상위 10개만
    }

    // 검색어가 있으면 필터링 후 인기순으로 정렬된 결과 반환
    return allActivities.filter((activity) => {
      return matchKoreanSearch(activity.title, searchKeyword);
    });
  }, [allActivities, searchKeyword]);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 745) {
        setItemsPerView(4);
      } else {
        setItemsPerView(2);
      }
      // 인덱스 리셋
      setCurrentIndex(0);
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  // 검색어 변경 시 인덱스 리셋
  useEffect(() => {
    setCurrentIndex(0);
  }, [searchKeyword]);

  // 가로 스크롤 함수들
  const getMaxIndex = () => {
    return Math.max(0, activities.length - itemsPerView);
  };

  const handlePrevious = () => {
    setCurrentIndex(Math.max(0, currentIndex - 1));
  };

  const handleNext = () => {
    const maxIndex = getMaxIndex();
    setCurrentIndex(Math.min(maxIndex, currentIndex + 1));
  };

  const canScrollLeft = currentIndex > 0;
  const canScrollRight = currentIndex < getMaxIndex();

  if (loading) {
    return (
      <section className="w-full bg-transparent py-[3rem] sm-tablet:py-[2.5rem] sm-mobile:py-[2rem]">
        <div className="flex justify-center px-[2.5rem] sm-tablet:px-[1.875rem] sm-mobile:px-6">
          <div className="w-[75rem] sm-tablet:w-[46.5rem] sm-mobile:w-[29.125rem] px-[2.5rem] sm-tablet:px-[1.875rem] sm-mobile:px-0">
            <div className="text-center">로딩 중...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-transparent py-[3rem] sm-tablet:py-[2.5rem] sm-mobile:py-[2rem]">
      <div className="flex justify-center px-[2.5rem] sm-tablet:px-[1.875rem] sm-mobile:px-6">
        <div className="w-[75rem] sm-tablet:w-[46.5rem] sm-mobile:w-[29.125rem] px-0 sm-tablet:px-0 sm-mobile:px-0">
          {/* Section Title */}
          <div className="mb-[2.25rem] sm-tablet:mb-[2.25rem] sm-mobile:mb-[2.25rem]">
            <h2 className="ty-32_B text-gray-950">🔥 인기 체험</h2>
          </div>

          {/* Horizontal Scroll Container */}
          <div className="relative">
            {/* Navigation Buttons - Show when scrollable */}
            {activities.length > itemsPerView && (
              <>
                {/* Previous Button */}
                <button
                  onClick={handlePrevious}
                  disabled={!canScrollLeft}
                  className={`absolute left-[-1.25rem] top-[calc(50%-2rem)] sm-tablet:top-[calc(50%-1.5rem)] sm-mobile:top-[calc(50%-1.5rem)] z-10 transform -translate-y-1/2 w-10 h-10 rounded-full shadow-lg transition-all duration-200 ${
                    canScrollLeft
                      ? "bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900"
                      : "bg-gray-100 text-gray-300 cursor-not-allowed"
                  }`}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="mx-auto"
                  >
                    <path
                      d="M15 18L9 12L15 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  disabled={!canScrollRight}
                  className={`absolute right-[-1.25rem] top-[calc(50%-2rem)] sm-tablet:top-[calc(50%-1.5rem)] sm-mobile:top-[calc(50%-1.5rem)] z-10 transform -translate-y-1/2 w-10 h-10 rounded-full shadow-lg transition-all duration-200 ${
                    canScrollRight
                      ? "bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900"
                      : "bg-gray-100 text-gray-300 cursor-not-allowed"
                  }`}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="mx-auto"
                  >
                    <path
                      d="M9 18L15 12L9 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </>
            )}

            {/* Cards Container */}
            <div className="overflow-hidden pb-8 sm-tablet:pb-6 sm-mobile:pb-6">
              <div
                className="flex gap-[1.5rem] sm-tablet:gap-4 sm-mobile:gap-4 pb-8 sm-tablet:pb-6 sm-mobile:pb-6 transition-transform duration-300 ease-in-out"
                style={{
                  transform: `translateX(calc(-${currentIndex} * (100% + ${itemsPerView === 4 ? "1.5rem" : "1rem"})))`,
                }}
              >
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex-none"
                    style={{
                      width: `calc((100% - ${itemsPerView === 4 ? "4.5rem" : "1rem"}) / ${itemsPerView})`,
                    }}
                  >
                    <ActivityCard activity={activity} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularActivities;
