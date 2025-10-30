import { Modal } from "../Modal";
import ExperienceCardList from "./Card/experience-card-list";
import EmptyData from "./EmptyData/empty-data";
import SkeletonUi from "./skeleton-ui";
import { useMyExperiences } from "./useMyExperiences";

const MyExperiences = () => {
  const [
    data,
    navigate,
    authToken,
    isLoading,
    deleteSuccessModalOpen,
    error,
    observerTarget,
    isFetchingNextPage,
    setDeleteSuccessModalOpen,
  ] = useMyExperiences();

  if (!authToken) {
    navigate("/login");
    return null;
  }

  if (isLoading) {
    return <SkeletonUi />;
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
