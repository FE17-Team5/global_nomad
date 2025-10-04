import { useState, useEffect, useRef } from "react";
import type { Activity } from "../../../lib/activities/types";
import { getActivitiesList } from "../../../lib/activities/api";
import ActivityFilters from "./activity-filters";
import ActivityGrid from "./activity-grid";
import Pagination from "../../Pagination/pagination";
import Dropdown from "../../Dropdown/dropdown";
import image7 from "../../../assets/img/image7.png";
import image8 from "../../../assets/img/image8.png";
import image9 from "../../../assets/img/image9.png";
import image10 from "../../../assets/img/image10.png";
import image11 from "../../../assets/img/image11.png";
import image12 from "../../../assets/img/image12.png";
import image13 from "../../../assets/img/image13.png";
import image14 from "../../../assets/img/image14.png";

const AllActivities = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // 드래그 스크롤 상태
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  // 반응형 페이지 사이즈 (Tailwind 브레이크포인트와 동일하게)
  const getPageSize = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth <= 375) { // sm-mobile: 2열 3행
        return 6;
      } else if (window.innerWidth <= 744) { // sm-tablet: 2열 2행
        return 4;
      }
    }
    return 8; // 데스크탑: 4열 2행
  };

  const [pageSize, setPageSize] = useState(getPageSize());

  const sortOptions = [
    { value: "latest", label: "최신순" },
    { value: "most_reviewed", label: "후기 많은 순" },
    { value: "price_asc", label: "가격 낮은 순" },
    { value: "price_desc", label: "가격 높은 순" },
    { value: "rating_desc", label: "평점 높은 순" },
  ];

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      try {
        // 임시 테스트 데이터
        const mockActivities = [
          {
            id: 1,
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
            updatedAt: "2024-01-01"
          },
          {
            id: 2,
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
            updatedAt: "2024-01-01"
          },
          {
            id: 3,
            userId: 1,
            title: "북한산 등반 체험",
            description: "자연과 함께하는 등반 모험",
            category: "스포츠",
            price: 40000,
            address: "서울시 강북구",
            bannerImageUrl: image9,
            rating: 4.8,
            reviewCount: 24,
            createdAt: "2024-01-01",
            updatedAt: "2024-01-01"
          },
          {
            id: 4,
            userId: 1,
            title: "한강 자전거 투어",
            description: "서울의 아름다운 한강을 따라",
            category: "투어",
            price: 35000,
            address: "서울시 영등포구",
            bannerImageUrl: image10,
            rating: 4.3,
            reviewCount: 15,
            createdAt: "2024-01-01",
            updatedAt: "2024-01-01"
          },
          {
            id: 5,
            userId: 1,
            title: "경복궁 역사 투어",
            description: "조선시대 역사 체험",
            category: "관광",
            price: 30000,
            address: "서울시 종로구",
            bannerImageUrl: image11,
            rating: 4.6,
            reviewCount: 42,
            createdAt: "2024-01-01",
            updatedAt: "2024-01-01"
          },
          {
            id: 6,
            userId: 1,
            title: "템플스테이 명상 체험",
            description: "마음의 평화를 찾는 시간",
            category: "웰빙",
            price: 80000,
            address: "서울시 강남구",
            bannerImageUrl: image12,
            rating: 4.7,
            reviewCount: 28,
            createdAt: "2024-01-01",
            updatedAt: "2024-01-01"
          },
          {
            id: 7,
            userId: 1,
            title: "홍대 거리 예술 체험",
            description: "청춘의 거리에서 만나는 예술",
            category: "문화 · 예술",
            price: 25000,
            address: "서울시 마포구",
            bannerImageUrl: image13,
            rating: 4.1,
            reviewCount: 36,
            createdAt: "2024-01-01",
            updatedAt: "2024-01-01"
          },
          {
            id: 8,
            userId: 1,
            title: "한국 전통 차 체험",
            description: "차 문화의 깊은 맛을 느껴보세요",
            category: "식음료",
            price: 55000,
            address: "서울시 인사동",
            bannerImageUrl: image14,
            rating: 4.4,
            reviewCount: 21,
            createdAt: "2024-01-01",
            updatedAt: "2024-01-01"
          }
        ];

        // 페이지네이션을 위한 전체 데이터 세트 생성 (실제로는 더 많은 데이터가 있다고 가정)
        const currentPageSize = getPageSize();
        const startIndex = (currentPage - 1) * currentPageSize;
        const endIndex = startIndex + currentPageSize;
        const paginatedActivities = mockActivities.slice(startIndex, endIndex);

        setActivities(paginatedActivities);
        setTotalCount(20); // 임시 전체 개수 (실제로는 API에서 받아올 값)

        // 실제 API 호출 (주석 처리)
        // const response = await getActivitiesList({
        //   method: "offset",
        //   page: currentPage,
        //   size: pageSize,
        //   sort: sortBy,
        //   category: selectedCategory || undefined,
        // });
        // setActivities(response.activities);
        // setTotalCount(response.totalCount);
      } catch (error) {
        console.error("체험 데이터를 불러오는데 실패했습니다:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [currentPage, sortBy, selectedCategory, pageSize]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  // 스크롤 인디케이터 업데이트
  const updateScrollIndicators = () => {
    if (categoryScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = categoryScrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // 드래그 스크롤 이벤트 핸들러
  const handleMouseDown = (e: React.MouseEvent) => {
    if (categoryScrollRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - categoryScrollRef.current.offsetLeft);
      setScrollLeft(categoryScrollRef.current.scrollLeft);
      categoryScrollRef.current.style.cursor = 'grabbing';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !categoryScrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - categoryScrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // 스크롤 속도 조정
    categoryScrollRef.current.scrollLeft = scrollLeft - walk;
    updateScrollIndicators();
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (categoryScrollRef.current) {
      categoryScrollRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    if (categoryScrollRef.current) {
      categoryScrollRef.current.style.cursor = 'grab';
    }
  };

  // 스크롤 이벤트로 인디케이터 업데이트
  const handleScroll = () => {
    updateScrollIndicators();
  };

  // 컴포넌트 마운트 시 인디케이터 초기화
  useEffect(() => {
    const timer = setTimeout(updateScrollIndicators, 100);
    return () => clearTimeout(timer);
  }, []);

  // 윈도우 리사이즈 시 pageSize 업데이트
  useEffect(() => {
    const handleResize = () => {
      const newPageSize = getPageSize();
      if (newPageSize !== pageSize) {
        setPageSize(newPageSize);
        setCurrentPage(1); // 페이지 크기 변경 시 첫 페이지로 이동
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [pageSize]);

  return (
    <section className="w-full bg-transparent pt-[2.5rem] sm-tablet:pt-[2.5rem] sm-mobile:pt-[2.5rem]">
      <div className="flex justify-center px-[2.5rem] sm-tablet:px-[1.875rem] sm-mobile:px-0">
        <div className="w-[75rem] sm-tablet:w-full sm-mobile:w-[20.5rem] px-0 sm-tablet:px-0 sm-mobile:px-6">
          {/* Section Title & Filters */}
          <div className="mb-[2.25rem] sm-tablet:mb-[1.5rem] sm-mobile:mb-[1.5rem]">
            {/* Desktop: Title only */}
            <div className="sm-tablet:hidden sm-mobile:hidden mb-[2.25rem]">
              <h2 className="ty-32_B text-gray-950">
                🏔️ 모든 체험
              </h2>
            </div>

            {/* Tablet & Mobile: Title and Sort on same line */}
            <div className="hidden sm-tablet:flex sm-mobile:flex items-center justify-between mb-4">
              <h2 className="ty-32_B text-gray-950">
                🏔️ 모든 체험
              </h2>

              {/* Sort for Tablet & Mobile */}
              <div className="sm-tablet:block sm-mobile:block">
                <Dropdown
                  align="right"
                  trigger={
                    <div className="flex items-center gap-2 cursor-pointer">
                      <span className="ty-16_M text-gray-700 text-center">
                        {sortOptions.find(option => option.value === sortBy)?.label}
                      </span>
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                        <path d="M1 1.5L6 6.5L11 1.5" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  }
                  items={sortOptions.map(option => ({
                    label: option.label,
                    onClick: () => handleSortChange(option.value)
                  }))}
                />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="sm-tablet:hidden sm-mobile:hidden">
            <ActivityFilters
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              sortBy={sortBy}
              onSortChange={handleSortChange}
            />
          </div>

          {/* Mobile & Tablet: Category Filters Only */}
          <div className="hidden sm-tablet:block sm-mobile:block mb-6">
            <div className="relative">
              {/* 왼쪽 그라디언트 인디케이터 */}
              {canScrollLeft && (
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
              )}

              {/* 오른쪽 그라디언트 인디케이터 */}
              {canScrollRight && (
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
              )}

              <div
                ref={categoryScrollRef}
                className="flex gap-2 sm-tablet:overflow-x-auto sm-tablet:w-full sm-tablet:pb-2 sm-mobile:overflow-x-auto sm-mobile:w-full sm-mobile:pb-2 scrollbar-hide"
                style={{ cursor: 'grab' }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                onScroll={handleScroll}
                onTouchStart={(e) => {
                  // 터치 디바이스에서는 드래그 기능 비활성화
                  e.currentTarget.style.cursor = 'default';
                }}
              >
                <div className="flex gap-2 sm-tablet:flex-nowrap sm-tablet:min-w-max sm-mobile:flex-nowrap sm-mobile:min-w-max">
                {[
                  { value: "", label: "전체" },
                  { value: "문화 · 예술", label: "문화 · 예술" },
                  { value: "식음료", label: "식음료" },
                  { value: "스포츠", label: "스포츠" },
                  { value: "투어", label: "투어" },
                  { value: "관광", label: "관광" },
                  { value: "웰빙", label: "웰빙" },
                ].map((category) => (
                  <button
                    key={category.value}
                    onClick={() => handleCategoryChange(category.value)}
                    className={`px-4 py-2 rounded-full border transition-colors duration-200 whitespace-nowrap text-center
                      ty-16_M sm-mobile:ty-14_M ${
                      selectedCategory === category.value
                        ? "bg-primary-500 text-white border-primary-500"
                        : "bg-white text-gray-700 border-gray-300 hover:border-primary-300"
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
                </div>
              </div>
            </div>
          </div>

          {/* Activity Grid */}
          <ActivityGrid activities={activities} loading={loading} pageSize={pageSize} />

          {/* Pagination */}
          {!loading && activities.length > 0 && Math.ceil(totalCount / pageSize) > 1 && (
            <div className="mt-8 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(totalCount / pageSize)}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AllActivities;