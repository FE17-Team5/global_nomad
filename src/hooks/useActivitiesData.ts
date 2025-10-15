import { useState, useMemo, useEffect } from "react";
import { useActivitiesList } from "./queries/useActivitiesList";
import { usePageSize } from "./usePageSize";
import { matchKoreanSearch } from "../utils/korean-search";

const categories = ["문화 · 예술", "식음료", "스포츠", "투어", "관광", "웰빙"];
const sortOptions = [
  { value: "latest", label: "최신순" },
  { value: "most_reviewed", label: "리뷰 많은 순" },
  { value: "price_asc", label: "가격 낮은 순" },
  { value: "price_desc", label: "가격 높은 순" },
];

export const useActivitiesData = () => {
  const pageSize = usePageSize();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState<string>("");

  // 검색어 변경 시 페이지 리셋
  useEffect(() => {
    setCurrentPage(1);
  }, [keyword]);

  // API에서 모든 데이터 가져오기 (keyword 제외)
  const queryParams = {
    method: "offset" as const,
    page: 1,
    size: 100, // 충분히 큰 사이즈로 가져오기
    category:
      selectedCategories.length === 1 ? selectedCategories[0] : undefined,
    sort: selectedSort,
  };

  const { data: response, isLoading: loading } = useActivitiesList(queryParams);

  const allActivities = response?.activities || [];

  // 클라이언트 사이드에서 한글 초성 검색 필터링
  const filteredActivities = useMemo(() => {
    if (!keyword || !keyword.trim()) {
      return allActivities;
    }

    return allActivities.filter((activity) => {
      return matchKoreanSearch(activity.title, keyword);
    });
  }, [allActivities, keyword]);

  // 페이지네이션 적용
  const totalCount = filteredActivities.length;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const activities = filteredActivities.slice(startIndex, endIndex);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return [];
      } else {
        return [category];
      }
    });
    setCurrentPage(1);
  };

  const handleSortChange = (sortValue: string) => {
    setSelectedSort(sortValue);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
