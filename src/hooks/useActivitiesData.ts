import { useState } from "react";
import { useActivitiesList } from "./queries/useActivitiesList";
import { usePageSize } from "./usePageSize";

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

  const queryParams = {
    method: "offset" as const,
    page: currentPage,
    size: pageSize,
    category:
      selectedCategories.length === 1 ? selectedCategories[0] : undefined,
    sort: selectedSort,
  };

  const { data: response, isLoading: loading } = useActivitiesList(queryParams);

  const activities = response?.activities || [];
  const totalCount = response?.totalCount || 0;

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
  };
};
