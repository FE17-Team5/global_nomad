import { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  type NavigateFunction,
} from "react-router-dom";
import { useMyActivitiesInfinite } from "../../hooks/queries/useMyActivitiesInfinite";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import type { InfiniteData } from "@tanstack/react-query";
import type { MyActivitiesListResponse } from "../../lib/my-activities/types";

type MyExperiencesType = () => [
  data: InfiniteData<MyActivitiesListResponse, unknown> | undefined,
  navigate: NavigateFunction,
  authToken: string | null,
  isLoading: boolean,
  deleteSuccessModalOpen: boolean,
  error: Error | null,
  observerTarget: React.RefObject<HTMLDivElement | null>,
  isFetchingNextPage: boolean,
  setDeleteSuccessModalOpen: React.Dispatch<React.SetStateAction<boolean>>
];

export const useMyExperiences: MyExperiencesType = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const authToken = localStorage.getItem("accessToken");
  const [deleteSuccessModalOpen, setDeleteSuccessModalOpen] = useState(false);

  // 무한스크롤 쿼리
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    refetch,
  } = useMyActivitiesInfinite(authToken, 10);

  // 무한스크롤 트리거
  const observerTarget = useInfiniteScroll(
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  );

  // 등록/수정 후 데이터 갱신
  useEffect(() => {
    if (location.state?.shouldRefetch) {
      refetch();
      // state 초기화 (뒤로가기 시 재실행 방지)
      window.history.replaceState({}, document.title);
    }
  }, [location.state, refetch]);

  return [
    data,
    navigate,
    authToken,
    isLoading,
    deleteSuccessModalOpen,
    error,
    observerTarget,
    isFetchingNextPage,
    setDeleteSuccessModalOpen,
  ];
};
