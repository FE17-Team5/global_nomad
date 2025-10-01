import { useParams } from "react-router-dom";
import ActivityDescription from "../../components/Detail/activity-description";
import ActivityHeader from "../../components/Detail/activity-header";
import ActivityLocation from "../../components/Detail/activity-location";
import ImageGallery from "../../components/Detail/image-gallery";
import ReviewSection from "../../components/Detail/review-section";
import {
  ReservationSidebar,
  FixedReservationBar,
} from "../../components/Detail/Reservation";
import {
  mockActivityDetail,
  mockActivityReviews,
  mockAvailableSchedule,
} from "./mockdata";

const DetailPage = () => {
  const { id } = useParams();
  const activity = mockActivityDetail;

  // 임시 로그인 유저 ID (테스트용)
  // 추후 localStorage.getItem('userId') 또는 Context로 교체
  const MOCK_LOGGED_IN_USER_ID = 21;

  // URL ID가 21일 때만 소유자로 판단 (테스트용)
  const isOwner = Number(id) === MOCK_LOGGED_IN_USER_ID;

  return (
    <div className="w-full bg-white" style={{ minHeight: "100vh" }}>
      <div className="pt-[88px] mobile:pt-12 max-w-[1200px] tablet:max-w-[684px] mobile:max-w-[375px] mx-auto px-10 tablet:px-[30px] mobile:px-6">
        {/* 좌우 레이아웃: 좌측(컨텐츠) + 우측(예약 정보) */}
        <div className="flex tablet:flex-col mobile:flex-col gap-10 mobile:gap-5">
          {/* 좌측 컨텐츠 영역 */}
          <div className="max-w-[670px] tablet:max-w-full">
            {/* 이미지 갤러리 */}
            <ImageGallery
              bannerImageUrl={activity.bannerImageUrl}
              subImages={activity.subImages}
              title={activity.title}
            />

            {/* ActivityHeader - 태블릿/모바일에서만 표시 */}
            <div
              className="hidden tablet:block mobile:block tablet:mt-6 mobile:mt-5 tablet:pb-[7px] mobile:pb-5"
              style={{ borderBottom: "1px solid #E0E0E5" }}
            >
              <ActivityHeader
                id={activity.id}
                category={activity.category}
                title={activity.title}
                rating={activity.rating}
                reviewCount={activity.reviewCount}
                address={activity.address}
                isOwner={isOwner}
                hideSubtitle={true}
              />
            </div>

            {/* 체험 설명 */}
            <div className="mt-10 tablet:mt-[30px] mobile:mt-5">
              <ActivityDescription description={activity.description} />
            </div>

            {/* 지도 */}
            <div className="mobile:mt-5">
              <ActivityLocation address={activity.address} />
            </div>

            {/* 후기 */}
            <ReviewSection
              averageRating={mockActivityReviews.averageRating}
              totalCount={mockActivityReviews.totalCount}
              reviews={mockActivityReviews.reviews}
            />
          </div>

          {/* 우측 영역 - 데스크탑에서만 표시 */}
          <div className="max-w-[410px] flex-shrink-0 flex flex-col tablet:hidden">
            {/* 상단 정보 */}
            <ActivityHeader
              id={activity.id}
              category={activity.category}
              title={activity.title}
              rating={activity.rating}
              reviewCount={activity.reviewCount}
              address={activity.address}
              isOwner={isOwner}
            />

            {/* 예약 카드 (소유자가 아닐 때만 표시) */}
            {!isOwner && (
              <ReservationSidebar
                price={activity.price}
                availableSchedules={mockAvailableSchedule}
              />
            )}
          </div>
        </div>
      </div>

      {/* 태블릿 전용: 하단 픽스 예약 UI (소유자가 아닐 때만 표시) */}
      {!isOwner && (
        <FixedReservationBar
          price={activity.price}
          availableSchedules={mockAvailableSchedule}
        />
      )}
    </div>
  );
};

export default DetailPage;
