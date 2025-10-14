import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import ActivityDescription from "../../components/Detail/activity-description";
import ActivityHeader from "../../components/Detail/activity-header";
import ActivityLocation from "../../components/Detail/activity-location";
import ImageGallery from "../../components/Detail/image-gallery";
import {
  FixedReservationBar,
  ReservationSidebar,
} from "../../components/Detail/Reservation";
import ReviewSection from "../../components/Detail/review-section";
import { useActivityDetail } from "../../hooks/queries/useActivityDetail";
import { useActivityReviews } from "../../hooks/queries/useActivityReviews";
import { useAvailableSchedule } from "../../hooks/queries/useAvailableSchedule";
import { useMyProfile } from "../../hooks/queries/useMyProfile";

const DetailPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const activityId = Number(id);

  const authToken = localStorage.getItem("accessToken");

  // 페이지 로드 시 스크롤을 맨 위로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const now = new Date();
  const currentYear = now.getFullYear().toString();
  const currentMonth = (now.getMonth() + 1).toString().padStart(2, "0");

  const {
    data: activity,
    isLoading: activityLoading,
    error: activityError,
    refetch: refetchActivity,
  } = useActivityDetail(activityId);
  const { data: reviewsResponse, isLoading: reviewsLoading } =
    useActivityReviews(activityId, { page: 1, size: 5 });
  const { data: scheduleResponse, isLoading: scheduleLoading } =
    useAvailableSchedule(activityId, {
      year: currentYear,
      month: currentMonth,
    });
  const { data: myProfile } = useMyProfile(authToken);

  // 수정 후 데이터 갱신
  useEffect(() => {
    if (location.state?.shouldRefetch) {
      refetchActivity();
      // state 초기화 (뒤로가기 시 재실행 방지)
      window.history.replaceState({}, document.title);
    }
  }, [location.state, refetchActivity]);

  const isLoading = activityLoading || reviewsLoading || scheduleLoading;

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="ty-18_M text-gray-500">로딩 중...</div>
      </div>
    );
  }

  if (activityError || !activity || !reviewsResponse) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="ty-18_M text-red-500">
          데이터를 불러오는데 실패했습니다.
        </div>
      </div>
    );
  }

  const isOwner = myProfile?.id === activity.userId;

  return (
    <div className="w-full bg-white" style={{ minHeight: "100vh" }}>
      <div className="pt-[88px] sm-mobile:pt-12 max-w-[1200px] sm-tablet:max-w-[684px] sm-mobile:max-w-[375px] mx-auto px-10 sm-tablet:px-[30px] sm-mobile:px-6">
        <div className="flex sm-tablet:flex-col sm-mobile:flex-col gap-10 sm-mobile:gap-5">
          <div className="w-full max-w-[670px] sm-tablet:max-w-full">
            <ImageGallery
              bannerImageUrl={activity.bannerImageUrl}
              subImages={activity.subImages}
              title={activity.title}
            />

            <div
              className="hidden sm-tablet:block sm-mobile:block sm-tablet:mt-6 sm-mobile:mt-5 sm-tablet:pb-[7px] sm-mobile:pb-5"
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

            <div className="mt-10 sm-tablet:mt-[30px] sm-mobile:mt-5">
              <ActivityDescription description={activity.description} />
            </div>

            <div className="sm-mobile:mt-5">
              <ActivityLocation address={activity.address} />
            </div>

            <ReviewSection
              averageRating={reviewsResponse.averageRating}
              totalCount={reviewsResponse.totalCount}
              reviews={reviewsResponse.reviews}
            />
          </div>

          <div className="w-full max-w-[410px] min-w-[370px] flex flex-col sm-tablet:hidden">
            <ActivityHeader
              id={activity.id}
              category={activity.category}
              title={activity.title}
              rating={activity.rating}
              reviewCount={activity.reviewCount}
              address={activity.address}
              isOwner={isOwner}
            />

            {!isOwner && scheduleResponse && (
              <ReservationSidebar
                price={activity.price}
                availableSchedules={scheduleResponse}
              />
            )}
          </div>
        </div>
      </div>

      {!isOwner && scheduleResponse && (
        <FixedReservationBar
          price={activity.price}
          availableSchedules={scheduleResponse}
        />
      )}
    </div>
  );
};

export default DetailPage;
