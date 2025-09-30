import { mockActivityDetail, mockActivityReviews } from "./mockdata";
import ActivityHeader from "../../components/Detail/activity-header";
import ImageGallery from "../../components/Detail/image-gallery";
import ActivityDescription from "../../components/Detail/activity-description";
import ActivityLocation from "../../components/Detail/activity-location";
import ReviewSection from "../../components/Detail/review-section";
import ReservationSidebar from "../../components/Detail/reservation-sidebar";

const DetailPage = () => {
  const activity = mockActivityDetail;

  return (
    <div className="w-full" style={{ backgroundColor: "var(--color-gray-9)", minHeight: "100vh" }}>
      <div className="pt-[78px] max-w-[1200px] mx-auto px-6">
        {/* 첫 번째 컨테이너: 상단 정보 */}
        <ActivityHeader
          category={activity.category}
          title={activity.title}
          rating={activity.rating}
          reviewCount={activity.reviewCount}
          address={activity.address}
        />

        {/* 두 번째 컨테이너: 이미지 갤러리 */}
        <ImageGallery
          bannerImageUrl={activity.bannerImageUrl}
          subImages={activity.subImages}
          title={activity.title}
        />

        {/* 좌우 레이아웃: 좌측(컨텐츠) + 우측(사이드바) */}
        <div className="mt-[85px] flex gap-[24px]">
          {/* 좌측 컨텐츠 영역 */}
          <div className="max-w-[790px]">
            {/* 체험 설명 */}
            <ActivityDescription description={activity.description} />

            {/* 지도 */}
            <ActivityLocation address={activity.address} />

            {/* 후기 */}
            <ReviewSection
              averageRating={mockActivityReviews.averageRating}
              totalCount={mockActivityReviews.totalCount}
              reviews={mockActivityReviews.reviews}
            />
          </div>

          {/* 우측 사이드바 */}
          <ReservationSidebar />
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
