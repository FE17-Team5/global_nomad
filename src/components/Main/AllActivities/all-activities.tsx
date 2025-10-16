/**
 * 모든 체험 섹션 컴포넌트
 *
 * 메인 페이지의 전체 체험 목록을 표시하는 섹션
 * - 카테고리 필터링 (다중 선택 가능)
 * - 정렬 옵션 (최신순, 가격 높은순/낮은순, 리뷰 많은순)
 * - 한글 초성 검색 지원
 * - 페이지네이션
 * - 반응형: 데스크탑(필터+정렬), 태블릿/모바일(드래그 스크롤)
 */

import { useState, useEffect } from "react";
import { useActivitiesData } from "../../../hooks/useActivitiesData";
import { useDragScroll } from "../../../hooks/useDragScroll";
import Dropdown from "../../Dropdown/dropdown";
import Pagination from "../../Pagination/pagination";
import ActivityFilters from "./activity-filters";
import ActivityGrid from "./activity-grid";
import iconArt from "../../../assets/icon/icon_art.svg";
import iconFood from "../../../assets/icon/icon_food.svg";
import iconSport from "../../../assets/icon/icon_sport.svg";
import iconTour from "../../../assets/icon/icon_tour.svg";
import iconBus from "../../../assets/icon/icon_bus.svg";

interface AllActivitiesProps {
  searchKeyword?: string;
}

const AllActivities = ({ searchKeyword }: AllActivitiesProps) => {
  // 커스텀 훅: 드래그 스크롤
  const {
    scrollRef: categoryScrollRef,
    isDragging,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
  } = useDragScroll();

  // 커스텀 훅: 체험 데이터 관리
  const {
    activities, // 페이지네이션된 체험 목록
    categories,
    sortOptions,
    selectedCategories, // 다중 선택된 카테고리 배열
    selectedSort: sortBy,
    currentPage,
    loading, // 로딩 상태
    totalCount, // 전체 아이템 수
    pageSize, // 반응형 페이지 사이즈
    handleCategoryChange,
    handleSortChange,
    handlePageChange,
    setKeyword, // 검색어 설정 함수
  } = useActivitiesData();

  // 카테고리 아이콘 매핑
  const categoryIcons: Record<string, string> = {
    "문화 · 예술": iconArt,
    "식음료": iconFood,
    "스포츠": iconSport,
    "투어": iconTour,
    "관광": iconBus,
    "웰빙": iconFood, // 웰빙은 식음료 아이콘 사용
  };

  // 검색어가 변경되면 적용
  useEffect(() => {
    if (searchKeyword !== undefined) {
      setKeyword(searchKeyword);
    }
  }, [searchKeyword, setKeyword]);

  // 스크롤 인디케이터 상태
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // 스크롤 인디케이터 업데이트
  const updateScrollIndicators = () => {
    if (categoryScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        categoryScrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
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
  }, [updateScrollIndicators]);

  return (
    <section className="w-full bg-transparent pt-[2.5rem] sm-tablet:pt-[2.5rem] sm-mobile:pt-[2.5rem]">
      <div className="flex justify-center px-[2.5rem] sm-tablet:px-[1.875rem] sm-mobile:px-0">
        <div className="w-[75rem] sm-tablet:w-full sm-mobile:w-[20.5rem] px-0 sm-tablet:px-0 sm-mobile:px-6">
          {/* 섹션 제목 & 필터 */}
          <div className="mb-[2.25rem] sm-tablet:mb-[1.5rem] sm-mobile:mb-[1.5rem]">
            {/* 데스크탑: 제목만 */}
            <div className="sm-tablet:hidden sm-mobile:hidden mb-[2.25rem]">
              <h2 className="ty-32_B text-gray-950">🏔️ 모든 체험</h2>
            </div>

            {/* 태블릿 & 모바일: 제목과 정렬이 같은 줄 */}
            <div className="hidden sm-tablet:flex sm-mobile:flex items-center justify-between mb-4">
              <h2 className="ty-32_B text-gray-950">🏔️ 모든 체험</h2>

              {/* 정렬 옵션 - 태블릿 & 모바일 */}
              <div className="sm-tablet:block sm-mobile:block">
                <Dropdown
                  align="right"
                  trigger={
                    <div className="flex items-center gap-2 cursor-pointer">
                      <span className="ty-16_M text-gray-700 text-center">
                        {
                          sortOptions.find((option) => option.value === sortBy)
                            ?.label
                        }
                      </span>
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                        <path
                          d="M1 1.5L6 6.5L11 1.5"
                          stroke="#9CA3AF"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  }
                  items={sortOptions.map((option) => ({
                    label: option.label,
                    onClick: () => handleSortChange(option.value),
                  }))}
                />
              </div>
            </div>
          </div>

          {/* 필터 - 데스크탑 */}
          <div className="sm-tablet:hidden sm-mobile:hidden">
            <ActivityFilters
              categories={categories}
              sortOptions={sortOptions}
              selectedCategories={selectedCategories}
              selectedSort={sortBy}
              handleCategoryChange={handleCategoryChange}
              handleSortChange={handleSortChange}
            />
          </div>

          {/* 모바일 & 태블릿: 카테고리 필터만 (드래그 스크롤) */}
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
                className={`flex gap-2 sm-tablet:overflow-x-auto sm-tablet:w-full sm-tablet:pb-2 sm-mobile:overflow-x-auto sm-mobile:w-full sm-mobile:pb-2 scrollbar-hide ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                onScroll={handleScroll}
                style={{ userSelect: isDragging ? "none" : "auto" }}
              >
                <div className="flex gap-2 sm-tablet:flex-nowrap sm-tablet:min-w-max sm-mobile:flex-nowrap sm-mobile:min-w-max">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() =>
                        !isDragging && handleCategoryChange(category)
                      }
                      className={`px-4 py-2 rounded-full border transition-colors duration-200 whitespace-nowrap text-center flex items-center
                      ty-16_M sm-mobile:ty-14_M ${
                        selectedCategories.includes(category)
                          ? "bg-primary-500 text-white border-primary-500"
                          : "bg-white text-gray-700 border-[#D8D8D8] hover:border-primary-300"
                      }`}
                    >
                      {categoryIcons[category] && (
                        <img
                          src={categoryIcons[category]}
                          alt=""
                          className="w-5 h-5 mr-1.5 flex-shrink-0"
                        />
                      )}
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 체험 그리드 */}
          <ActivityGrid
            activities={activities}
            loading={loading}
            pageSize={pageSize}
          />

          {/* 페이지네이션 */}
          {!loading &&
            activities.length > 0 &&
            Math.ceil(totalCount / pageSize) > 1 && (
              <div className="mt-8 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(totalCount / pageSize)}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
        </div>
      </div>
    </section>
  );
};

export default AllActivities;
