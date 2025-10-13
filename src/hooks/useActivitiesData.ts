import { useState, useMemo, useEffect } from "react";
import { usePageSize } from "./usePageSize";
import image1 from "../assets/img/image1.png";
import image2 from "../assets/img/image2.png";
import image3 from "../assets/img/image3.png";
import image4 from "../assets/img/image4.png";
import image5 from "../assets/img/image5.png";
import image6 from "../assets/img/image6.png";
import image7 from "../assets/img/image7.png";
import image8 from "../assets/img/image8.png";
import image9 from "../assets/img/image9.png";
import image10 from "../assets/img/image10.png";

/**
 * useActivitiesData 커스텀 훅
 *
 * 체험 활동 데이터의 필터링, 정렬, 페이지네이션을 관리하는 훅
 * 현재는 mock 데이터 사용, 추후 API 연동 시 쉽게 교체 가능하도록 구조화
 *
 * 사용처: 메인 페이지의 AllActivities 컴포넌트 (체험 목록 데이터 관리)
 */

// TODO: 추후 API 연동 시 제거할 mock 데이터
const mockActivities = [
  {
    id: 1,
    userId: 1,
    title: "전통 도자기 만들기 원데이클래스",
    description: "전통 도예 기법으로 나만의 도자기 만들기",
    category: "문화 · 예술",
    rating: 4.8,
    reviewCount: 432,
    price: 45000,
    address: "경기도 이천시",
    bannerImageUrl: image1,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: 2,
    userId: 1,
    title: "전통 차 문화 체험",
    description: "한국 전통 차 문화의 깊은 맛과 향을 체험",
    category: "문화 · 예술",
    rating: 4.9,
    reviewCount: 324,
    price: 30000,
    address: "서울시 종로구",
    bannerImageUrl: image2,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: 3,
    userId: 1,
    title: "와인 테이스팅 클래스",
    description: "와인 전문가와 함께하는 테이스팅 클래스",
    category: "식음료",
    rating: 4.7,
    reviewCount: 198,
    price: 85000,
    address: "서울시 용산구",
    bannerImageUrl: image3,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: 4,
    userId: 1,
    title: "전통 한식 요리 클래스",
    description: "한국 전통 음식 만들기 체험",
    category: "식음료",
    rating: 4.2,
    reviewCount: 156,
    price: 65000,
    address: "서울시 종로구",
    bannerImageUrl: image4,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: 5,
    userId: 1,
    title: "한강 자전거 투어",
    description: "서울의 아름다운 한강을 따라 자전거 여행",
    category: "투어",
    rating: 4.3,
    reviewCount: 89,
    price: 35000,
    address: "서울시 영등포구",
    bannerImageUrl: image5,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: 6,
    userId: 1,
    title: "한옥마을 야경 투어",
    description: "전통 한옥의 아름다운 야경을 감상하는 투어",
    category: "투어",
    rating: 4.8,
    reviewCount: 267,
    price: 18000,
    address: "전주시 완산구",
    bannerImageUrl: image6,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: 7,
    userId: 1,
    title: "제주도 올레길 트레킹",
    description: "제주의 아름다운 자연을 만나는 올레길 걷기",
    category: "관광",
    rating: 4.6,
    reviewCount: 178,
    price: 25000,
    address: "제주특별자치도",
    bannerImageUrl: image7,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: 8,
    userId: 1,
    title: "경복궁 역사 투어",
    description: "조선시대 역사를 배우는 궁궐 투어",
    category: "관광",
    rating: 4.5,
    reviewCount: 203,
    price: 20000,
    address: "서울시 종로구",
    bannerImageUrl: image8,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: 9,
    userId: 1,
    title: "농촌 체험 캠핑",
    description: "자연 속에서 힐링하는 농촌 체험 캠핑",
    category: "웰빙",
    rating: 4.4,
    reviewCount: 145,
    price: 55000,
    address: "강원도 춘천시",
    bannerImageUrl: image9,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: 10,
    userId: 1,
    title: "템플스테이 명상 체험",
    description: "마음의 평화를 찾는 템플스테이",
    category: "웰빙",
    rating: 4.7,
    reviewCount: 98,
    price: 80000,
    address: "경기도 양평군",
    bannerImageUrl: image10,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
];

const categories = ["문화 · 예술", "식음료", "투어", "관광", "웰빙"];
const sortOptions = [
  { value: "latest", label: "최신순" },
  { value: "mostReviewed", label: "리뷰 많은 순" },
  { value: "priceDesc", label: "가격 높은 순" },
  { value: "priceAsc", label: "가격 낮은 순" },
];

export const useActivitiesData = () => {
  const pageSize = usePageSize(); // 반응형 페이지 사이즈 훅 사용
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // 선택된 카테고리 배열 (빈 배열이면 전체)
  const [selectedSort, setSelectedSort] = useState("latest"); // 선택된 정렬 옵션
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [paginatedActivities, setPaginatedActivities] = useState<
    typeof mockActivities
  >([]); // 페이지네이션된 활동
  const [totalCount, setTotalCount] = useState(0); // 전체 아이템 수

  // 필터링된 활동 목록 (현재는 클라이언트 필터링, 추후 API로 대체)
  const filteredActivities = useMemo(() => {
    if (selectedCategories.length === 0) return mockActivities; // 빈 배열이면 전체 데이터
    return mockActivities.filter((activity) =>
      selectedCategories.includes(activity.category),
    );
  }, [selectedCategories]);

  // 정렬된 활동 목록 (현재는 클라이언트 정렬, 추후 API로 대체)
  const sortedActivities = useMemo(() => {
    const sorted = [...filteredActivities];
    switch (selectedSort) {
      case "mostReviewed":
        return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
      case "priceDesc":
        return sorted.sort((a, b) => b.price - a.price);
      case "priceAsc":
        return sorted.sort((a, b) => a.price - b.price);
      case "latest":
      default:
        return sorted.sort((a, b) => b.id - a.id);
    }
  }, [filteredActivities, selectedSort]);

  // 페이지네이션 처리 (현재는 클라이언트 처리, 추후 API 서버에서 처리)
  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      try {
        // 페이지네이션을 위한 슬라이싱
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedData = sortedActivities.slice(startIndex, endIndex);

        setPaginatedActivities(paginatedData);
        setTotalCount(sortedActivities.length); // 필터링된 전체 개수

        // API 호출 시뮬레이션을 위한 딜레이 (추후 제거)
        await new Promise((resolve) => setTimeout(resolve, 300));
      } catch (error) {
        console.error("체험 데이터를 불러오는데 실패했습니다:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [currentPage, sortedActivities, pageSize]);

  const handleCategoryChange = (category: string) => {
    // 다중선택 토글 방식: 선택된 카테고리를 다시 클릭하면 해제, 새로운 카테고리는 추가
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        // 이미 선택된 카테고리라면 제거
        return prev.filter((cat) => cat !== category);
      } else {
        // 새로운 카테고리라면 추가
        return [...prev, category];
      }
    });
    setCurrentPage(1); // 필터 변경 시 첫 페이지로 이동
  };

  const handleSortChange = (sortValue: string) => {
    setSelectedSort(sortValue);
    setCurrentPage(1); // 정렬 변경 시 첫 페이지로 이동
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    // 데이터 (추후 API response로 대체)
    activities: paginatedActivities, // 페이지네이션된 활동 목록
    allActivities: sortedActivities, // 전체 활동 목록 (필요시 사용)
    categories,
    sortOptions,
    // 상태
    selectedCategories, // 다중 선택된 카테고리 배열
    selectedSort,
    currentPage,
    loading, // 로딩 상태
    totalCount, // 전체 아이템 수
    pageSize, // 반응형 페이지 사이즈
    // 핸들러
    handleCategoryChange,
    handleSortChange,
    handlePageChange,
  };
};
