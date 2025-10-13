import { useState, useEffect, useRef } from "react";
import type { Activity } from "../../../lib/activities/types";
import { getActivitiesList } from "../../../lib/activities/api";
import ActivityCard from "./activity-card";
import image3 from "../../../assets/img/image3.png";
import image4 from "../../../assets/img/image4.png";
import image5 from "../../../assets/img/image5.png";
import image6 from "../../../assets/img/image6.png";
import image7 from "../../../assets/img/image7.png";
import image8 from "../../../assets/img/image8.png";

const PopularActivities = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPopularActivities = async () => {
      try {
        // 임시 테스트 데이터
        const mockActivities = [
          {
            id: 1,
            userId: 1,
            title: "함께 배우고 즐기는 스트릿 댄스",
            description: "스트릿 댄스의 기초부터 고급까지",
            category: "문화 · 예술",
            price: 50000,
            address: "서울시 강남구",
            bannerImageUrl: image3,
            rating: 4.5,
            reviewCount: 10,
            createdAt: "2024-01-01",
            updatedAt: "2024-01-01",
          },
          {
            id: 2,
            userId: 1,
            title: "도시 농업 체험하기",
            description: "도심 속에서 만나는 농업",
            category: "웰빙",
            price: 30000,
            address: "서울시 홍대",
            bannerImageUrl: image4,
            rating: 4.2,
            reviewCount: 25,
            createdAt: "2024-01-01",
            updatedAt: "2024-01-01",
          },
          {
            id: 3,
            userId: 1,
            title: "전통 도자기 만들기",
            description: "옛 장인의 기법으로 배우는 도자기",
            category: "문화 · 예술",
            price: 80000,
            address: "서울시 인사동",
            bannerImageUrl: image5,
            rating: 4.8,
            reviewCount: 15,
            createdAt: "2024-01-01",
            updatedAt: "2024-01-01",
          },
          {
            id: 4,
            userId: 1,
            title: "서울 한강 카약 투어",
            description: "한강에서 즐기는 수상 스포츠",
            category: "스포츠",
            price: 60000,
            address: "서울시 여의도",
            bannerImageUrl: image6,
            rating: 4.3,
            reviewCount: 8,
            createdAt: "2024-01-01",
            updatedAt: "2024-01-01",
          },
          {
            id: 5,
            userId: 1,
            title: "서울 야경 사진 촬영 투어",
            description: "전문가와 함께하는 서울 야경 촬영",
            category: "문화 · 예술",
            price: 45000,
            address: "서울시 중구",
            bannerImageUrl: image7,
            rating: 4.5,
            reviewCount: 32,
            createdAt: "2024-01-01",
            updatedAt: "2024-01-01",
          },
          {
            id: 6,
            userId: 1,
            title: "전통 한식 요리 클래스",
            description: "한국 전통 음식 만들기 체험",
            category: "식음료",
            price: 65000,
            address: "서울시 종로구",
            bannerImageUrl: image8,
            rating: 4.2,
            reviewCount: 18,
            createdAt: "2024-01-01",
            updatedAt: "2024-01-01",
          },
        ];

        setActivities(mockActivities);

        // 실제 API 호출 (주석 처리)
        // const response = await getActivitiesList({
        //   method: "offset",
        //   page: 1,
        //   size: 8,
        //   sort: "most_reviewed",
        // });
        // setActivities(response.activities);
      } catch (error) {
        console.error("인기 체험 데이터를 불러오는데 실패했습니다:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularActivities();
  }, []);

  // 화면 크기에 따른 itemsPerView 업데이트
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

  const getScrollPercentage = () => {
    return 100 / itemsPerView;
  };

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
                  className={`absolute left-[-1.25rem] top-1/2 z-10 transform -translate-y-1/2 w-10 h-10 rounded-full shadow-lg transition-all duration-200 ${
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
                  className={`absolute right-[-1.25rem] top-1/2 z-10 transform -translate-y-1/2 w-10 h-10 rounded-full shadow-lg transition-all duration-200 ${
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
            <div className="overflow-hidden">
              <div
                className="flex gap-[1.5rem] sm-tablet:gap-4 sm-mobile:gap-4 transition-transform duration-300 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * getScrollPercentage()}%)`,
                }}
              >
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex-none"
                    style={{
                      width: `calc(${getScrollPercentage()}% - ${itemsPerView === 4 ? "1.125rem" : "0.5rem"})`,
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
