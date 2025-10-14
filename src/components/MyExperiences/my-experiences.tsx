import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMyActivitiesInfinite } from "../../hooks/queries/useMyActivitiesInfinite";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { Modal } from "../Modal";
import ExperienceCardList from "./Card/experience-card-list";
import EmptyData from "./EmptyData/empty-data";

const MyExperiences = () => {
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
    isFetchingNextPage,
  );

  // 등록/수정 후 데이터 갱신
  useEffect(() => {
    if (location.state?.shouldRefetch) {
      refetch();
      // state 초기화 (뒤로가기 시 재실행 방지)
      window.history.replaceState({}, document.title);
    }
  }, [location.state, refetch]);

  if (!authToken) {
    navigate("/login");
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="ty-16_M text-gray-400">로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="ty-16_M text-red-500">
          데이터를 불러오는데 실패했습니다.
        </p>
      </div>
    );
  }

  // 전체 페이지 데이터 병합
  const allActivities = data?.pages.flatMap((page) => page.activities) || [];

  return (
    <>
      <div>
        {allActivities.length > 0 ? (
          <>
            <ExperienceCardList
              experiences={allActivities}
              onDeleteSuccess={() => setDeleteSuccessModalOpen(true)}
            />

            {/* 무한스크롤 트리거 영역 */}
            <div ref={observerTarget} className="h-10 w-full" />

            {/* 추가 로딩 표시 */}
            {isFetchingNextPage && (
              <div className="flex justify-center items-center py-8">
                <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </>
        ) : (
          <EmptyData />
        )}
      </div>

      <Modal
        message="체험이 삭제되었습니다."
        isOpen={deleteSuccessModalOpen}
        onClose={() => setDeleteSuccessModalOpen(false)}
      />
    </>
  );
};

export default MyExperiences;
