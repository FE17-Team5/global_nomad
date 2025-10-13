/**
 * ReviewSection 컴포넌트
 *
 * 체험 후기 전체 영역 (페이지네이션 포함)
 * - "후기" 제목
 * - 평균 평점 (32px 큰 숫자) + "매우 만족" + 총 후기 수
 * - 리뷰 아이템 리스트 (한 페이지당 3개)
 * - 페이지네이션 (5개 단위 블록)
 * - 상태 관리: 현재 페이지, 리뷰 필터링
 * - 성능 최적화: useMemo로 리뷰 계산 캐싱
 */

import { useMemo, useState } from "react";
import Pagination from "../Pagination/pagination";
import ReviewItem from "./review-item";

const REVIEWS_PER_PAGE = 3;

interface ReviewUser {
  profileImageUrl: string;
  nickname: string;
  id?: number;
}

interface Review {
  id: number;
  user: ReviewUser;
  content: string;
  createdAt: string;
}

interface ReviewSectionProps {
  averageRating: number;
  totalCount: number;
  reviews: Review[];
}

const ReviewSection = ({
  averageRating,
  totalCount,
  reviews,
}: ReviewSectionProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);

  // 현재 페이지에 표시할 리뷰 계산
  const currentReviews = useMemo(() => {
    const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
    const endIndex = startIndex + REVIEWS_PER_PAGE;
    return reviews.slice(startIndex, endIndex);
  }, [currentPage, reviews]);

  return (
    <section className="mt-[40px] sm-mobile:mt-5 mb-[200px] sm-mobile:mb-[75px]">
      {/* 후기 제목 */}
      <div className="flex items-center gap-2">
        <h2
          className="ty-18_B sm-mobile:ty-16_B"
          style={{ color: "var(--color-gray-950)" }}
        >
          체험 후기
        </h2>
        <span
          className="ty-16_B sm-mobile:ty-14_SB"
          style={{ color: "var(--color-gray-2)" }}
        >
          {totalCount}개
        </span>
      </div>

      {/* 후기가 없을 때 */}
      {totalCount === 0 || reviews.length === 0 ? (
        <div className="mt-10 flex flex-col items-center justify-center py-20 border border-gray-200 rounded-lg">
          <p className="ty-16_M text-gray-400">아직 후기가 없습니다.</p>
          <p className="ty-14_M text-gray-300 mt-2">첫 번째 후기를 남겨보세요!</p>
        </div>
      ) : (
        <>
          {/* 평점 정보 */}
          <div className="mt-2 flex flex-col items-center">
        {/* 평균 평점 */}
        <div
          className="ty-32_B sm-mobile:ty-24_SB"
          style={{ color: "var(--color-gray-950)" }}
        >
          {averageRating}
        </div>

        {/* 만족도 */}
        <p
          className="mt-1 ty-16_B sm-mobile:ty-14_B"
          style={{ color: "var(--color-gray-950)" }}
        >
          매우 만족
        </p>

        {/* 총 후기 수 */}
        <p
          className="mt-[6px] ty-14_M"
          style={{ color: "var(--color-gray-200)" }}
        >
          <span style={{ color: "var(--color-yellow-star)" }}>★</span>{" "}
          {totalCount}개 후기
        </p>
      </div>

      {/* 리뷰 리스트 */}
      <div className="mt-[30px] flex flex-col gap-5 sm-mobile:gap-10">
        {currentReviews.map((review) => (
          <ReviewItem
            key={review.id}
            user={review.user}
            content={review.content}
            createdAt={review.createdAt}
          />
        ))}
      </div>

          {/* 페이지네이션 */}
          <div className="mt-10 sm-mobile:mt-[30px]">
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default ReviewSection;
