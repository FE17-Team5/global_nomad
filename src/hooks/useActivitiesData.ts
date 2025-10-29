/**
 * useActivitiesData 커스텀 훅
 *
 * 메인 페이지 AllActivities 섹션의 체험 데이터 관리 훅
 * - 카테고리 필터링 (다중 선택 가능)
 * - 정렬 옵션 (최신순, 리뷰 많은 순, 가격 낮은 순, 가격 높은 순)
 * - 한글 초성 검색 지원
 * - 반응형 페이지네이션 (화면 크기에 따라 페이지 사이즈 자동 조정)
 *
 * 사용처: AllActivities 컴포넌트
 */

import { useState, useMemo, useEffect } from "react";
import { useActivitiesList } from "./queries/useActivitiesList";
import { usePageSize } from "./usePageSize";
import { matchKoreanSearch } from "../utils/korean-search";

// 카테고리 목록
const categories = ["문화 · 예술", "식음료", "스포츠", "투어", "관광", "웰빙"];

// 정렬 옵션 목록
const sortOptions = [
  { value: "latest", label: "최신순" },
  { value: "most_reviewed", label: "리뷰 많은 순" },
  { value: "rating_desc", label: "별점 높은 순" },
  { value: "price_asc", label: "가격 낮은 순" },
  { value: "price_desc", label: "가격 높은 순" },
];

export const useActivitiesData = () => {
  // 반응형 페이지 사이즈
  const pageSize = usePageSize();

  // 상태 관리
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState<string>("");

  // 검색어 변경 시 첫 페이지로 이동
  useEffect(() => {
    setCurrentPage(1);
  }, [keyword]);

  // API 호출 파라미터 구성
  // rating_desc는 API에서 지원하지 않으므로 latest로 가져와서 클라이언트에서 정렬
  const apiSort = selectedSort === "rating_desc" ? "latest" : selectedSort;

  const queryParams = {
    method: "offset" as const,
    page: 1,
    size: 100, // 모든 데이터를 가져와서 클라이언트에서 필터링
    category:
      selectedCategories.length === 1
        ? (selectedCategories[0] as
            | "문화 · 예술"
            | "식음료"
            | "스포츠"
            | "투어"
            | "관광"
            | "웰빙")
        : undefined,
    sort: apiSort as "latest" | "most_reviewed" | "price_asc" | "price_desc",
  };

  // API에서 체험 데이터 가져오기
  const { data: response, isLoading: loading } = useActivitiesList(queryParams);

  const allActivities = response?.activities || [];

  // 클라이언트 사이드 필터링 및 정렬
  const filteredActivities = useMemo(() => {
    // 1. 검색어 필터링
    let filtered = allActivities;
    if (keyword && keyword.trim()) {
      filtered = allActivities.filter((activity) => {
        return matchKoreanSearch(activity.title, keyword);
      });
    }

    // 2. 별점 높은 순 정렬 (클라이언트 사이드)
    if (selectedSort === "rating_desc") {
      filtered = [...filtered].sort((a, b) => {
        // 평점이 높은 순
        if (b.rating !== a.rating) {
          return b.rating - a.rating;
        }
        // 평점이 같으면 리뷰 많은 순
        return b.reviewCount - a.reviewCount;
      });
    }

    return filtered;
  }, [allActivities, keyword, selectedSort]);

  // 페이지네이션: 현재 페이지에 표시할 체험 계산
  const totalCount = filteredActivities.length;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const activities = filteredActivities.slice(startIndex, endIndex);

  // 카테고리 변경 핸들러 (단일 선택)
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) => {
      // 이미 선택된 카테고리를 다시 클릭하면 선택 해제
      if (prev.includes(category)) {
        return [];
      } else {
        // 새 카테고리 선택 (단일 선택만 지원)
        return [category];
      }
    });
    setCurrentPage(1); // 첫 페이지로 이동
  };

  // 정렬 옵션 변경 핸들러
  const handleSortChange = (sortValue: string) => {
    setSelectedSort(sortValue);
    setCurrentPage(1); // 첫 페이지로 이동
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 훅의 반환값
  return {
    activities,
    categories,
    sortOptions,
    selectedCategories,
    selectedSort,
    currentPage,
    loading,
    totalCount,
    pageSize,
    handleCategoryChange,
    handleSortChange,
    handlePageChange,
    setKeyword,
  };
};
