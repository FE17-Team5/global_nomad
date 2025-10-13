import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
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
import {
  getActivityDetail,
  getActivityReviews,
} from "../../lib/activities/api";
import type { ActivityDetail } from "../../lib/activities/types";
import type { ActivityReviewsResponse } from "../../lib/activities/types";

// API 사용 여부 토글 (테스트 후 false로 변경)
const USE_API = false; // Mock 데이터 사용

const DetailPage = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState<ActivityDetail | null>(
    USE_API ? null : mockActivityDetail,
  );
  const [reviews, setReviews] = useState<ActivityReviewsResponse | null>(
    USE_API ? null : mockActivityReviews,
  );
  const [isLoading, setIsLoading] = useState(USE_API);
  const [error, setError] = useState<string | null>(null);

  // API로 데이터 가져오기
  useEffect(() => {
    if (!USE_API || !id) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // 병렬로 데이터 가져오기
        const [activityData, reviewsData] = await Promise.all([
          getActivityDetail(Number(id)),
          getActivityReviews(Number(id), { page: 1, size: 5 }),
        ]);

        setActivity(activityData);
        setReviews(reviewsData);
      } catch (err) {
        console.error("데이터 로드 실패:", err);
        setError("데이터를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // 로딩 중
  if (USE_API && isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="ty-18_M text-gray-500">로딩 중...</div>
      </div>
    );
  }

  // 에러 발생
  if (USE_API && error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="ty-18_M text-red-500">{error}</div>
      </div>
    );
  }

  // 데이터 없음
  if (!activity || !reviews) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="ty-18_M text-gray-500">데이터가 없습니다.</div>
      </div>
    );
  }

  // Mock 데이터 사용 시 (USE_API = false)
  const displayActivity = USE_API ? activity : mockActivityDetail;
  const displayReviews = USE_API ? reviews : mockActivityReviews;
  const displaySchedules = mockAvailableSchedule; // 일단 Mock 유지

  // 로그인한 사용자 정보 (TODO: API 연동)
  const currentUserId = null; // 임시 - 비로그인 상태

  // 소유자 판단
  const isOwner = currentUserId
    ? displayActivity.userId === currentUserId
    : false;

  return (
    <div className="w-full bg-white" style={{ minHeight: "100vh" }}>
      <div className="pt-[88px] sm-mobile:pt-12 max-w-[1200px] sm-tablet:max-w-[684px] sm-mobile:max-w-[375px] mx-auto px-10 sm-tablet:px-[30px] sm-mobile:px-6">
        {/* 좌우 레이아웃: 좌측(컨텐츠) + 우측(예약 정보) */}
        <div className="flex sm-tablet:flex-col sm-mobile:flex-col gap-10 sm-mobile:gap-5">
          {/* 좌측 컨텐츠 영역 */}
          <div className="w-full max-w-[670px] sm-tablet:max-w-full">
            {/* 이미지 갤러리 */}
            <ImageGallery
              bannerImageUrl={displayActivity.bannerImageUrl}
              subImages={displayActivity.subImages}
              title={displayActivity.title}
            />

            {/* ActivityHeader - 태블릿/모바일에서만 표시 */}
            <div
              className="hidden sm-tablet:block sm-mobile:block sm-tablet:mt-6 sm-mobile:mt-5 sm-tablet:pb-[7px] sm-mobile:pb-5"
              style={{ borderBottom: "1px solid #E0E0E5" }}
            >
              <ActivityHeader
                id={displayActivity.id}
                category={displayActivity.category}
                title={displayActivity.title}
                rating={displayActivity.rating}
                reviewCount={displayActivity.reviewCount}
                address={displayActivity.address}
                isOwner={isOwner}
                hideSubtitle={true}
              />
            </div>

            {/* 체험 설명 */}
            <div className="mt-10 sm-tablet:mt-[30px] sm-mobile:mt-5">
              <ActivityDescription description={displayActivity.description} />
            </div>

            {/* 지도 */}
            <div className="sm-mobile:mt-5">
              <ActivityLocation address={displayActivity.address} />
            </div>

            {/* 후기 */}
            <ReviewSection
              averageRating={displayReviews.averageRating}
              totalCount={displayReviews.totalCount}
              reviews={displayReviews.reviews}
            />
          </div>

          {/* 우측 영역 - 데스크탑에서만 표시 */}
          <div className="w-full max-w-[410px] min-w-[370px] flex flex-col sm-tablet:hidden">
            {/* 상단 정보 */}
            <ActivityHeader
              id={displayActivity.id}
              category={displayActivity.category}
              title={displayActivity.title}
              rating={displayActivity.rating}
              reviewCount={displayActivity.reviewCount}
              address={displayActivity.address}
              isOwner={isOwner}
            />

            {/* 예약 카드 (소유자가 아닐 때만 표시) */}
            {!isOwner && (
              <ReservationSidebar
                price={displayActivity.price}
                availableSchedules={displaySchedules}
              />
            )}
          </div>
        </div>
      </div>

      {/* 태블릿 전용: 하단 픽스 예약 UI (소유자가 아닐 때만 표시) */}
      {!isOwner && (
        <FixedReservationBar
          price={displayActivity.price}
          availableSchedules={displaySchedules}
        />
      )}
    </div>
  );
};

export default DetailPage;
